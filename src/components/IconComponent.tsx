import React from 'react';
import type { ComponentData } from '../types/component';

interface IconComponentProps {
  component: ComponentData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ComponentData>) => void;
}

export const IconComponent: React.FC<IconComponentProps> = ({
  component,
  isSelected,
  onSelect
}) => {
  const getIconSize = () => {
    switch (component.props.size) {
      case 'small': return '16px';
      case 'medium': return '24px';
      case 'large': return '32px';
      case 'xlarge': return '48px';
      default: return '24px';
    }
  };

  return (
    <span
      className={`component-icon ${isSelected ? 'selected' : ''}`}
      style={{
        fontSize: getIconSize(),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        ...component.props.style
      }}
      onClick={() => onSelect(component.id)}
    >
      {component.props.icon || '⭐'}
    </span>
  );
};
