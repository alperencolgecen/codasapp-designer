import type { ReactNode } from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/FooterComponent.css';

export const FooterComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Footer' },
    render: (_props: Record<string, any>, children?: ReactNode) => (
        <footer className="canvas-cmp-footer">{children}</footer>
    ),
};
