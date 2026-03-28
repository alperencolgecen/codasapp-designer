import React from 'react';
import type { ComponentData } from '../types/component';

interface CardComponentProps {
  component: ComponentData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ComponentData>) => void;
}

export const CardComponent: React.FC<CardComponentProps> = ({
  component,
  isSelected,
  onSelect,
  onUpdate
}) => {
  return (
    <div
      className={`component-card ${isSelected ? 'selected' : ''}`}
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        ...component.props.style
      }}
      onClick={() => onSelect(component.id)}
    >
      {component.props.title && (
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
          {component.props.title}
        </h3>
      )}
      {component.props.subtitle && (
        <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '14px' }}>
          {component.props.subtitle}
        </p>
      )}
      <div className="card-content">
        {component.children.map((child) => (
          <div key={child.id} className="card-child">
            {/* Child component will be rendered by ComponentRenderer */}
          </div>
        ))}
      </div>
    </div>
  );
};
