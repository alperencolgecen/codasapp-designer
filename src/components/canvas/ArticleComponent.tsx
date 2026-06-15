import type { ReactNode } from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/ArticleComponent.css';

export const ArticleComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Article' },
    render: (_props: Record<string, any>, children?: ReactNode) => (
        <article className="canvas-cmp-article">{children}</article>
    ),
};
