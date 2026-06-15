import React from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/HeadingComponent.css';

const HeadingTag = ({ level, children, className }: { level: number; children: React.ReactNode; className: string }) => {
    const Tag = `h${Math.min(6, Math.max(1, level || 2))}` as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
};

export const HeadingComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Heading', level: 2 },
    render: (props) => (
        <HeadingTag level={props.level} className="canvas-cmp-heading">
            {props.text || 'Heading'}
        </HeadingTag>
    ),
};
