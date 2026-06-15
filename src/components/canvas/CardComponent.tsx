import type { ReactNode } from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/CardComponent.css';

export const CardComponent: CanvasComponentDefinition = {
    defaultProps: { title: '', subtitle: '' },
    render: (props, children?: ReactNode) => (
        <div className="canvas-cmp-card">
            {props.title && <h3 className="canvas-cmp-card__title">{props.title}</h3>}
            {props.subtitle && <p className="canvas-cmp-card__subtitle">{props.subtitle}</p>}
            {children}
        </div>
    ),
};
