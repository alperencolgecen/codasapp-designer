import type { ReactNode } from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/ContainerComponent.css';

export const ContainerComponent: CanvasComponentDefinition = {
    defaultProps: {},
    render: (_props: Record<string, any>, children?: ReactNode) => (
        <div className="canvas-cmp-container">{children}</div>
    ),
};
