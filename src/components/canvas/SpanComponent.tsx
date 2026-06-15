import type { CanvasComponentDefinition } from './types';
import '../../styles/components/SpanComponent.css';

export const SpanComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Inline text' },
    render: (props) => (
        <span className="canvas-cmp-span">{props.text || 'Inline text'}</span>
    ),
};
