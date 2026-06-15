import type { ReactNode } from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/HeaderComponent.css';

export const HeaderComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Header' },
    render: (_props: Record<string, any>, children?: ReactNode) => (
        <header className="canvas-cmp-header">{children}</header>
    ),
};
