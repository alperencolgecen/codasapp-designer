import React from 'react';
import type { ComponentData } from '../types/component';

interface DividerComponentProps {
  component: ComponentData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ComponentData>) => void;
}

export const DividerComponent: React.FC<DividerComponentProps> = ({
  component,
  isSelected,
  onSelect
}) => {
  const isHorizontal = component.props.orientation !== 'vertical';
  const thickness = component.props.thickness || '1px';
  
  return (
    <div
      className={`component-divider ${isSelected ? 'selected' : ''}`}
      style={{
        width: isHorizontal ? '100%' : thickness,
        height: isHorizontal ? thickness : '100%',
        backgroundColor: '#e5e7eb',
        margin: isHorizontal ? '8px 0' : '0 8px',
        ...component.props.style
      }}
      onClick={() => onSelect(component.id)}
    />
  );
};
