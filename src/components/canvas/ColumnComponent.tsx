import type { ReactNode } from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/ColumnComponent.css';

export const ColumnComponent: CanvasComponentDefinition = {
    defaultProps: {},
    render: (_props: Record<string, any>, children?: ReactNode) => (
        <div className="canvas-cmp-column">{children}</div>
    ),
};
