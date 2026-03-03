import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { ComponentData } from '../types/component';
import { useComponentLogic } from '../hooks/useComponentLogic.tsx';

interface ComponentRendererProps {
    component: ComponentData;
    selectedId: string | null;
    selectComponent: (id: string | null) => void;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
    component,
    selectedId,
    selectComponent
}) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: component.id,
        data: { type: component.type, isSidebarItem: false, component }
    });

    const { isSelected, effectiveStyle, handleSelect, renderView } = useComponentLogic({
        component,
        selectedId,
        selectComponent,
        transform,
        ComponentRenderer // For recursion
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onClick={handleSelect}
            className={`component-wrapper ${isSelected ? 'component-wrapper--selected' : ''} ${isDragging ? 'component-wrapper--dragging' : ''}`}
            style={effectiveStyle}
        >
            {renderView()}
        </div>
    );
};
