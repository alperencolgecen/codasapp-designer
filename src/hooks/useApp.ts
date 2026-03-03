import { useState, useCallback } from 'react';
import { useSensor, useSensors, PointerSensor, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core';
import { useBuilder, type TabType } from '../context/BuilderContext';
import type { ComponentType } from '../types/component';

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

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = useCallback((event: DragStartEvent) => {
        const { active } = event;
        const isSidebarItem = active.data.current?.isSidebarItem;

        if (isSidebarItem) {
            const type = active.data.current?.type as ComponentType;
            setActiveItem({ type });
        }
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        const isSidebarItem = active.data.current?.isSidebarItem;

        setActiveItem(null);

        if (over && over.id === 'canvas-drop-zone') {
            const canvas = document.getElementById('canvas-paper');
            if (canvas && event.activatorEvent instanceof MouseEvent) {
                const rect = canvas.getBoundingClientRect();

                // Calculate position relative to the canvas
                // We use clientX/Y from the activator event and adjust by canvas position
                const x = event.activatorEvent.clientX - rect.left;
                const y = event.activatorEvent.clientY - rect.top;

                if (isSidebarItem) {
                    const type = active.data.current?.type as ComponentType;
                    // Center the component on the drop point (assuming 100x40 default size for now or just placing top-left)
                    // For now, let's place it exactly at the mouse point
                    if (type) addComponent(type, undefined, x, y);
                } else {
                    const componentId = active.id as string;
                    // For moving existing items, we might need delta but let's try absolute first if it's simpler
                    // However, moveComponent in BuilderContext currently just sets absolute pos.
                    // If we want "snap to mouse", this works.
                    moveComponent(componentId, x, y);
                }
            }
        }
    }, [addComponent, moveComponent]);

    return {
        components,
        activeItem,
        sensors,
        handleDragStart,
        handleDragEnd,
        isPreviewMode,
        togglePreviewMode,
        selectComponent,
        setActiveTab,
    };
};
