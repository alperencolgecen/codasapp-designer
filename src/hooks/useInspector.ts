import { useCallback } from 'react';
import { useBuilder } from '../context/BuilderContext';

export const useInspector = () => {
    const {
        selectedId,
        components,
        updateComponent,
        updateComponentStyle,
        activeStyleState,
        setActiveStyleState
    } = useBuilder();

    // Helper to find selected component in tree
    const findComponentById = (nodes: any[], id: string): any => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children?.length > 0) {
                const found = findComponentById(node.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    const selectedComponent = selectedId ? findComponentById(components, selectedId) : null;

    const handlePropChange = useCallback((propName: string, value: any) => {
        if (selectedId) {
            updateComponent(selectedId, { [propName]: value });
        }
    }, [selectedId, updateComponent]);

    const handleStyleChange = useCallback((styleChanges: any) => {
        if (selectedId) {
            updateComponentStyle(selectedId, activeStyleState, styleChanges);
        }
    }, [selectedId, activeStyleState, updateComponentStyle]);

    const getStyleValue = (prop: string) => {
        if (!selectedComponent) return '';
        const ss = selectedComponent.stateStyles;
        if (!ss) return selectedComponent.props.style?.[prop] || '';
        const base = ss.base || {};
        const stateOverrides = activeStyleState === 'base' ? {} : (ss[activeStyleState] || {});
        return stateOverrides[prop] || base[prop] || '';
    };

    return {
        selectedComponent,
        activeStyleState,
        setActiveStyleState,
        handlePropChange,
        handleStyleChange,
        getStyleValue
    };
};
