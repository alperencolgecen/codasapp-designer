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
            case 'input':
                return <input 
                    type={props.type || 'text'} 
                    placeholder={props.placeholder || 'Enter text...'}
                    value={props.value || ''}
                    name={props.name}
                    className={className} 
                    style={style} 
                />;
            case 'card':
                return (
                    <div className={className} style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '16px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        ...style
                    }}>
                        {props.title && (
                            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
                                {props.title}
                            </h3>
                        )}
                        {props.subtitle && (
                            <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '14px' }}>
                                {props.subtitle}
                            </p>
                        )}
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
            case 'icon':
                const iconSize = props.size === 'small' ? '16px' : 
                                props.size === 'medium' ? '24px' : 
                                props.size === 'large' ? '32px' : 
                                props.size === 'xlarge' ? '48px' : '24px';
                return (
                    <span 
                        className={className} 
                        style={{ fontSize: iconSize, display: 'inline-flex', alignItems: 'center', ...style }}
                    >
                        {props.icon || '⭐'}
                    </span>
                );
            case 'divider':
                const isHorizontal = props.orientation !== 'vertical';
                const thickness = props.thickness || '1px';
                return (
                    <div 
                        className={className} 
                        style={{
                            width: isHorizontal ? '100%' : thickness,
                            height: isHorizontal ? thickness : '100%',
                            backgroundColor: '#e5e7eb',
                            margin: isHorizontal ? '8px 0' : '0 8px',
                            ...style
                        }}
                    />
                );
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
