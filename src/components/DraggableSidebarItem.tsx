import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { ComponentType } from '../types/component';
import { Box, Type, MousePointerClick, Image, Columns, LayoutGrid, FileInput, CreditCard, Star, Minus, Heading2, Pilcrow, TextQuote, Code2, Link2, List, TextCursorInput, ChevronDown, CheckSquare, Circle, Tag, Menu, ChevronRight, ChevronsLeftRight, Video, Frame, Volume2, ImageDown, LayoutPanelTop, FileText, PanelTop, PanelBottom, PanelRight, ChevronDownSquare, GanttChartSquare, AlignJustify, AppWindow, Speech, Table2, Gauge, CircleDot, CircleUser, TriangleAlert } from 'lucide-react';
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
        case 'heading': return <Heading2 size={iconSize} strokeWidth={stroke} />;
        case 'paragraph': return <Pilcrow size={iconSize} strokeWidth={stroke} />;
        case 'span': return <Type size={iconSize} strokeWidth={stroke} />;
        case 'blockquote': return <TextQuote size={iconSize} strokeWidth={stroke} />;
        case 'precode': return <Code2 size={iconSize} strokeWidth={stroke} />;
        case 'link': return <Link2 size={iconSize} strokeWidth={stroke} />;
        case 'list': return <List size={iconSize} strokeWidth={stroke} />;
        case 'textarea': return <TextCursorInput size={iconSize} strokeWidth={stroke} />;
        case 'select': return <ChevronDown size={iconSize} strokeWidth={stroke} />;
        case 'checkbox': return <CheckSquare size={iconSize} strokeWidth={stroke} />;
        case 'radio': return <Circle size={iconSize} strokeWidth={stroke} />;
        case 'label': return <Tag size={iconSize} strokeWidth={stroke} />;
        case 'navbar': return <Menu size={iconSize} strokeWidth={stroke} />;
        case 'breadcrumb': return <ChevronRight size={iconSize} strokeWidth={stroke} />;
        case 'pagination': return <ChevronsLeftRight size={iconSize} strokeWidth={stroke} />;
        case 'video': return <Video size={iconSize} strokeWidth={stroke} />;
        case 'iframe': return <Frame size={iconSize} strokeWidth={stroke} />;
        case 'audio': return <Volume2 size={iconSize} strokeWidth={stroke} />;
        case 'figure': return <ImageDown size={iconSize} strokeWidth={stroke} />;
        case 'section': return <LayoutPanelTop size={iconSize} strokeWidth={stroke} />;
        case 'article': return <FileText size={iconSize} strokeWidth={stroke} />;
        case 'header': return <PanelTop size={iconSize} strokeWidth={stroke} />;
        case 'footer': return <PanelBottom size={iconSize} strokeWidth={stroke} />;
        case 'aside': return <PanelRight size={iconSize} strokeWidth={stroke} />;
        case 'details': return <ChevronDownSquare size={iconSize} strokeWidth={stroke} />;
        case 'tabs': return <GanttChartSquare size={iconSize} strokeWidth={stroke} />;
        case 'accordion': return <AlignJustify size={iconSize} strokeWidth={stroke} />;
        case 'modal': return <AppWindow size={iconSize} strokeWidth={stroke} />;
        case 'tooltip': return <Speech size={iconSize} strokeWidth={stroke} />;
        case 'table': return <Table2 size={iconSize} strokeWidth={stroke} />;
        case 'progress': return <Gauge size={iconSize} strokeWidth={stroke} />;
        case 'badge': return <CircleDot size={iconSize} strokeWidth={stroke} />;
        case 'avatar': return <CircleUser size={iconSize} strokeWidth={stroke} />;
        case 'alert': return <TriangleAlert size={iconSize} strokeWidth={stroke} />;
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