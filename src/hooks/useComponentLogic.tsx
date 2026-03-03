import React from 'react';
import type { ComponentData, ComponentType } from '../types/component';

interface UseComponentLogicProps {
    component: ComponentData;
    selectedId: string | null;
    selectComponent: (id: string | null) => void;
    transform: any;
    ComponentRenderer: any; // For recursion
}

export const useComponentLogic = ({
    component,
    selectedId,
    selectComponent,
    transform,
    ComponentRenderer
}: UseComponentLogicProps) => {
    const isSelected = selectedId === component.id;

    const dragStyle = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const hasPosition = component.props.style?.left !== undefined || component.props.style?.top !== undefined;

    const effectiveStyle = {
        ...component.props.style,
        position: hasPosition ? 'absolute' as const : 'relative' as const,
        ...dragStyle
    };

    const handleSelect = (e: React.MouseEvent) => {
        e.stopPropagation();
        selectComponent(component.id);
    };

    const renderView = () => {
        const props = { ...component.props };
        const style = { ...component.props.style };
        const className = props.className || '';

        switch (component.type as ComponentType) {
            case 'container':
            case 'row':
            case 'column':
                return (
                    <div className={className} style={style}>
                        {component.children.map(child => (
                            <ComponentRenderer
                                key={child.id}
                                component={child}
                                selectedId={selectedId}
                                selectComponent={selectComponent}
                            />
                        ))}
                    </div>
                );
            case 'text':
                return <p className={className} style={style}>{props.text || 'Text Element'}</p>;
            case 'button':
                return <button className={className} style={style}>{props.text || 'Button'}</button>;
            case 'image':
                return <img src={props.src || 'https://via.placeholder.com/150'} alt={props.alt || 'img'} className={className} style={style} />;
            default:
                return <div className={className}>Unknown</div>;
        }
    };

    return {
        isSelected,
        effectiveStyle,
        handleSelect,
        renderView
    };
};
