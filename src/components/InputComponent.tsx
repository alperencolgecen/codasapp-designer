import React from 'react';
import type { ComponentData } from '../types/component';

interface InputComponentProps {
  component: ComponentData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ComponentData>) => void;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  component,
  isSelected,
  onSelect,
  onUpdate
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(component.id, {
      props: {
        ...component.props,
        value: e.target.value
      }
    });
  };

  return (
    <input
      type={component.props.type || 'text'}
      placeholder={component.props.placeholder || 'Enter text...'}
      value={component.props.value || ''}
      name={component.props.name}
      className={`component-input ${isSelected ? 'selected' : ''}`}
      style={component.props.style}
      onChange={handleChange}
      onClick={() => onSelect(component.id)}
    />
  );
};
