import { useState, useCallback, useRef, useEffect } from 'react';
import { useSensor, useSensors, PointerSensor, type DragStartEvent, type DragMoveEvent, type DragEndEvent } from '@dnd-kit/core';
import { useBuilder, type TabType } from '../context/BuilderContext';
import type { ComponentType, ComponentData } from '../types/component';
import { getDefaultSize } from '../utils/defaults';

const SIDEBAR_ID_PREFIX = 'sidebar-';

const findComponentById = (nodes: ComponentData[], id: string): ComponentData | null => {
    for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children.length > 0) {
            const found = findComponentById(node.children, id);
            if (found) return found;
        }
    }
    return null;
};

const parseSidebarId = (id: string): ComponentType | null => {
    if (!id.startsWith(SIDEBAR_ID_PREFIX)) return null;
    const parts = id.split('-');
    if (parts.length < 3) return null;
    return parts[1] as ComponentType;
};

export const useApp = () => {
    const {
        components,
        addComponent,
        selectComponent,
        isPreviewMode,
        togglePreviewMode,
        moveComponent,
        activeTab,
        setActiveTab: originalSetActiveTab
    } = useBuilder();

    const setActiveTab = useCallback((tab: TabType) => {
        if (tab === activeTab) {
            originalSetActiveTab(null);
        } else {
            originalSetActiveTab(tab);
        }
    }, [activeTab, originalSetActiveTab]);

    const [activeItem, setActiveItem] = useState<{ type: ComponentType } | null>(null);
    const pointerRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const track = (e: PointerEvent) => {
            pointerRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('pointermove', track);
        return () => window.removeEventListener('pointermove', track);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = useCallback((event: DragStartEvent) => {
        const { active } = event;
        const id = active.id as string;
        const isSidebar = id.startsWith(SIDEBAR_ID_PREFIX);
        console.log('[DRAG] handleDragStart', { id, isSidebar, data: active.data.current });

        if (isSidebar) {
            const type = parseSidebarId(id) || active.data.current?.type as ComponentType;
            if (type) setActiveItem({ type });
        }
    }, []);

    const isInsideCanvas = useCallback((clientX: number, clientY: number) => {
        const canvas = document.getElementById('canvas-paper');
        if (!canvas) return false;
        const rect = canvas.getBoundingClientRect();
        return (
            clientX >= rect.left && clientX <= rect.right &&
            clientY >= rect.top && clientY <= rect.bottom
        );
    }, []);

    const handleDragMove = useCallback((event: DragMoveEvent) => {
        if (event.over) {
            console.log('[DRAG] handleDragMove OVER', { overId: event.over.id, delta: event.delta });
        }
    }, []);

    const handleDragOver = useCallback((event: DragMoveEvent) => {
        console.log('[DRAG] handleDragOver (over changed)', { overId: event.over?.id, delta: event.delta });
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        const activeId = active.id as string;
        console.log('[DRAG] handleDragEnd', { id: activeId, overId: over?.id, delta: event.delta, data: active.data?.current });

        setActiveItem(null);

        const canvas = document.getElementById('canvas-paper');
        if (!canvas) {
            console.log('[DRAG] canvas-paper element not found');
            return;
        }

        const { x: clientX, y: clientY } = pointerRef.current;

        const isOverCanvas = over && over.id === 'canvas-drop-zone';
        const isInside = isInsideCanvas(clientX, clientY);

        if (!isOverCanvas && !isInside) {
            console.log('[DRAG] not over canvas');
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const isSidebar = activeId.startsWith(SIDEBAR_ID_PREFIX);
        const existingComponent = findComponentById(components, activeId);

        if (existingComponent) {
            const style = existingComponent.props.style || {};
            const currentLeft = parseFloat(String(style.left || 0));
            const currentTop = parseFloat(String(style.top || 0));
            const dx = event.delta?.x || 0;
            const dy = event.delta?.y || 0;
            console.log('[DRAG] moving existing component', { activeId, currentLeft, currentTop, dx, dy });
            moveComponent(activeId, currentLeft + dx, currentTop + dy);
        } else {
            const type = (
                active.data.current?.type as ComponentType ||
                parseSidebarId(activeId) ||
                'container'
            );
            const size = getDefaultSize(type);
            const x = clientX - rect.left - size.width / 2;
            const y = clientY - rect.top - size.height / 2;
            console.log('[DRAG] adding new component', { type, x, y, clientX, clientY, rect: { left: rect.left, top: rect.top } });
            addComponent(type, undefined, Math.max(0, x), Math.max(0, y));
        }
    }, [components, addComponent, moveComponent, isInsideCanvas]);

    return {
        components,
        activeItem,
        sensors,
        handleDragStart,
        handleDragMove,
        handleDragOver,
        handleDragEnd,
        isPreviewMode,
        togglePreviewMode,
        selectComponent,
        setActiveTab,
    };
};
