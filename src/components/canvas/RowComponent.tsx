import type { ReactNode } from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/RowComponent.css';

export const RowComponent: CanvasComponentDefinition = {
    defaultProps: {},
    render: (_props: Record<string, any>, children?: ReactNode) => (
        <div className="canvas-cmp-row">{children}</div>
    ),
};
