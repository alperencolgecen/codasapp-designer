import type { ReactNode } from 'react';

export interface CanvasComponentProps {
    [key: string]: any;
}

export interface CanvasComponentDefinition {
    defaultProps: CanvasComponentProps;
    render: (props: CanvasComponentProps, children?: ReactNode) => ReactNode;
}
