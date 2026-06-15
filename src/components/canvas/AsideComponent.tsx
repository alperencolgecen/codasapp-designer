import type { ReactNode } from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/AsideComponent.css';

export const AsideComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Aside' },
    render: (_props: Record<string, any>, children?: ReactNode) => (
        <aside className="canvas-cmp-aside">{children}</aside>
    ),
};
