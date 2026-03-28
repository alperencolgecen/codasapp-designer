import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { ComponentType } from '../types/component';
import { Box, Type, MousePointerClick, Image, Columns, LayoutGrid, FileInput, CreditCard, Star, Minus } from 'lucide-react';
import '../styles/DraggableSidebarItem.css';

interface DraggableSidebarItemProps {
    type: ComponentType;
    label: string;
}

const getIcon = (type: ComponentType) => {
    const iconSize = 20;
    const stroke = 2;
    switch (type) {
        case 'container': return <Box size={iconSize} strokeWidth={stroke} />;
        case 'text': return <Type size={iconSize} strokeWidth={stroke} />;
        case 'button': return <MousePointerClick size={iconSize} strokeWidth={stroke} />;
        case 'image': return <Image size={iconSize} strokeWidth={stroke} />;
        case 'row': return <Columns size={iconSize} strokeWidth={stroke} />;
        case 'column': return <LayoutGrid size={iconSize} strokeWidth={stroke} />;
        case 'input': return <FileInput size={iconSize} strokeWidth={stroke} />;
        case 'card': return <CreditCard size={iconSize} strokeWidth={stroke} />;
        case 'icon': return <Star size={iconSize} strokeWidth={stroke} />;
        case 'divider': return <Minus size={iconSize} strokeWidth={stroke} />;
        default: return <Box size={iconSize} strokeWidth={stroke} />;
    }
};

export const DraggableSidebarItem: React.FC<DraggableSidebarItemProps> = ({ type, label }) => {
    const uniqueId = React.useMemo(() => `sidebar-${type}-${Math.random().toString(36).substr(2, 9)}`, [type]);

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: uniqueId,
        data: { type, isSidebarItem: true },
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`sidebar-item ${isDragging ? 'sidebar-item--dragging' : ''}`}
        >
            <div className="sidebar-item__icon">
                {getIcon(type)}
            </div>
            <span className="sidebar-item__label">{label}</span>
        </div>
    );
};