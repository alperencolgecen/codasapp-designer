import type { ReactNode } from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/SectionComponent.css';

export const SectionComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Section' },
    render: (_props: Record<string, any>, children?: ReactNode) => (
        <section className="canvas-cmp-section">{children}</section>
    ),
};
