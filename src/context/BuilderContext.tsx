import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ComponentData, ComponentType, StyleState, ComponentStyle } from '../types/component';
import { createRootComponent, createComponent } from '../utils/component-factory';

export type TabType = 'discover' | 'templates' | 'elements' | 'uploads' | 'archive' | null;

interface BuilderContextType {
    components: ComponentData[];
    selectedId: string | null;
    selectedIds: string[]; // Multi-selection support
    activeStyleState: StyleState;
    setActiveStyleState: (state: StyleState) => void;
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    addComponent: (type: ComponentType, parentId?: string, x?: number, y?: number) => void;
    updateComponent: (id: string, props: Partial<any>) => void;
    updateComponentStyle: (id: string, state: StyleState, styleChanges: ComponentStyle) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    isPreviewMode: boolean;
    togglePreviewMode: () => void;
    selectComponent: (id: string | null, shiftKey?: boolean) => void;
    deselectAll: () => void;
    deleteSelectedComponents: () => void;
    moveComponent: (id: string, x: number, y: number) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export { BuilderContext };

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [components, setComponents] = useState<ComponentData[]>([createRootComponent()]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]); // Multi-selection
    const [activeStyleState, setActiveStyleState] = useState<StyleState>('base');
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('elements');

    // History
    const [history, setHistory] = useState<ComponentData[][]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const saveToHistory = (newComponents: ComponentData[]) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(newComponents)));
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    // ── Tree helpers ────────────────────────────────────────────────────────
    const findNode = (nodes: ComponentData[], id: string): ComponentData | null => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children.length > 0) {
                const found = findNode(node.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    /**
     * Compute the effective inline style for a component at a given state.
     * Effective style = base merged with the state-specific overrides.
     * If state === 'base', just return base.
     */
    const computeEffectiveStyle = (node: ComponentData, state: StyleState): ComponentStyle => {
        const base = node.stateStyles?.base || {};
        if (state === 'base') return { ...base };
        const overrides = node.stateStyles?.[state] || {};
        return { ...base, ...overrides };
    };

    /**
     * Sync `props.style` to match the effective style of the currently active state.
     */
    const syncPropsStyle = (node: ComponentData, state: StyleState) => {
        node.props.style = computeEffectiveStyle(node, state);
    };

    // Ensure stateStyles exists (backward compatibility for old components)
    const ensureStateStyles = (node: ComponentData) => {
        if (!node.stateStyles) {
            node.stateStyles = {
                base: node.props.style ? { ...node.props.style } : {},
                hover: {},
                active: {},
                focus: {},
            };
        }
    };

    // ── addComponent ────────────────────────────────────────────────────────
    const addComponent = (type: ComponentType, parentId?: string, x?: number, y?: number) => {
        const newComponent = createComponent(type);

        if (x !== undefined && y !== undefined) {
            newComponent.props.style = {
                ...newComponent.props.style,
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`
            };
            // Sync stateStyles too
            newComponent.stateStyles.base = {
                ...newComponent.stateStyles.base,
                ...newComponent.props.style
            };
        }

        setComponents((prev) => {
            if (historyIndex === -1 && history.length === 0) {
                const initialHistory = [JSON.parse(JSON.stringify(prev))];
                setHistory(initialHistory);
                setHistoryIndex(0);
            } else if (historyIndex < history.length - 1) {
                const newHistory = history.slice(0, historyIndex + 1);
                setHistory(newHistory);
                setHistoryIndex(newHistory.length - 1);
            }

            const newComponents: ComponentData[] = JSON.parse(JSON.stringify(prev));

            const addToParent = (nodes: ComponentData[]): boolean => {
                for (const node of nodes) {
                    if (node.id === parentId) {
                        newComponent.parentId = parentId;
                        node.children.push(newComponent);
                        return true;
                    }
                    if (node.children.length > 0) {
                        if (addToParent(node.children)) return true;
                    }
                }
                return false;
            };

            if (!parentId) {
                if (newComponents.length > 0) {
                    newComponent.parentId = newComponents[0].id;
                    newComponents[0].children.push(newComponent);
                }
            } else {
                addToParent(newComponents);
            }

            saveToHistory(newComponents);
            return newComponents;
        });
    };

    // ── updateComponent (generic props update, unchanged) ───────────────────
    const updateComponent = (id: string, newProps: Partial<any>) => {
        setComponents((prev) => {
            const newComponents: ComponentData[] = JSON.parse(JSON.stringify(prev));

            const updateNode = (nodes: ComponentData[]): boolean => {
                for (const node of nodes) {
                    if (node.id === id) {
                        if (newProps.style && node.props.style) {
                            node.props = {
                                ...node.props,
                                ...newProps,
                                style: { ...node.props.style, ...newProps.style }
                            };
                        } else {
                            node.props = { ...node.props, ...newProps };
                        }
                        return true;
                    }
                    if (node.children.length > 0) {
                        if (updateNode(node.children)) return true;
                    }
                }
                return false;
            };

            updateNode(newComponents);
            saveToHistory(newComponents);
            return newComponents;
        });
    };

    // ── updateComponentStyle (STATE-AWARE with auto-inheritance) ─────────────
    /**
     * Core logic:
     *  - state === 'base':
     *      1. Write changes to stateStyles.base
     *      2. For each changed key, propagate to hover/active/focus
     *         ONLY IF that state does NOT already have its own value for that key
     *         (override protection — never overwrite manually set values)
     *      3. Sync props.style to effective style of current activeStyleState
     *
     *  - state !== 'base':
     *      1. Write changes to stateStyles[state] (this marks them as overridden)
     *      2. Sync props.style to effective style of that state
     */
    const updateComponentStyle = (id: string, state: StyleState, styleChanges: ComponentStyle) => {
        setComponents((prev) => {
            const newComponents: ComponentData[] = JSON.parse(JSON.stringify(prev));

            const updateNode = (nodes: ComponentData[]): boolean => {
                for (const node of nodes) {
                    if (node.id === id) {
                        ensureStateStyles(node);

                        if (state === 'base') {
                            // 1. Write to base
                            node.stateStyles.base = {
                                ...node.stateStyles.base,
                                ...styleChanges,
                            };

                            // 2. Auto-inherit: propagate to other states ONLY for
                            //    keys they haven't overridden.
                            //    Since we compute effective style dynamically in `computeEffectiveStyle`,
                            //    we don't need to explicitly copy values to other states.
                            //    Any state without an override for a property will naturally fall back to base.
                        } else {
                            // Write only to the specific state (override = breaks inheritance)
                            node.stateStyles[state] = {
                                ...node.stateStyles[state],
                                ...styleChanges,
                            };
                        }

                        // 3. Sync props.style to the effective style of the active state
                        syncPropsStyle(node, activeStyleState);

                        return true;
                    }
                    if (node.children.length > 0) {
                        if (updateNode(node.children)) return true;
                    }
                }
                return false;
            };

            updateNode(newComponents);
            saveToHistory(newComponents);
            return newComponents;
        });
    };

    // ── Undo / Redo ─────────────────────────────────────────────────────────
    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(prev => prev - 1);
            setComponents(JSON.parse(JSON.stringify(history[historyIndex - 1])));
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(prev => prev + 1);
            setComponents(JSON.parse(JSON.stringify(history[historyIndex + 1])));
        }
    };

    const selectComponent = (id: string | null, shiftKey?: boolean) => {
        if (id === null) {
            setSelectedId(null);
            setSelectedIds([]);
            return;
        }

        if (shiftKey) {
            setSelectedIds(prev => {
                if (prev.includes(id)) {
                    const next = prev.filter(currentId => currentId !== id);
                    setSelectedId(next.length > 0 ? next[next.length - 1] : null);
                    return next;
                } else {
                    setSelectedId(id);
                    return [...prev, id];
                }
            });
        } else {
            setSelectedId(id);
            setSelectedIds([id]);
        }
        // Reset to base when selecting a new component
        setActiveStyleState('base');
    };

    const deselectAll = () => {
        setSelectedId(null);
        setSelectedIds([]);
    };

    const deleteSelectedComponents = useCallback(() => {
        if (selectedIds.length === 0) return;

        setComponents((prev) => {
            const newComponents: ComponentData[] = JSON.parse(JSON.stringify(prev));

            const removeFromNodes = (nodes: ComponentData[]): ComponentData[] => {
                return nodes.filter(node => {
                    if (selectedIds.includes(node.id)) return false;
                    if (node.children.length > 0) {
                        node.children = removeFromNodes(node.children);
                    }
                    return true;
                });
            };

            const updatedComponents = removeFromNodes(newComponents);
            saveToHistory(updatedComponents);
            return updatedComponents;
        });

        deselectAll();
    }, [selectedIds, deselectAll]);

    // Keyboard Listener for Delete/Backspace
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only trigger if not in an input/textarea
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.key === 'Delete' || e.key === 'Backspace') {
                deleteSelectedComponents();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [deleteSelectedComponents]);


    const togglePreviewMode = () => setIsPreviewMode(prev => !prev);

    const moveComponent = (id: string, x: number, y: number) => {
        updateComponentStyle(id, 'base', {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`
        });
    };

    return (
        <BuilderContext.Provider value={{
            components,
            selectedId,
            selectedIds,
            activeStyleState,
            setActiveStyleState,
            activeTab,
            setActiveTab,
            addComponent,
            updateComponent,
            updateComponentStyle,
            selectComponent,
            deselectAll,
            deleteSelectedComponents,
            moveComponent,
            isPreviewMode,
            togglePreviewMode,
            undo,
            redo,
            canUndo: historyIndex > 0,
            canRedo: historyIndex < history.length - 1
        }}>
            {children}
        </BuilderContext.Provider>
    );
};

export const useBuilder = () => {
    const context = useContext(BuilderContext);
    if (context === undefined) {
        throw new Error('useBuilder must be used within a BuilderProvider');
    }
    return context;
};
