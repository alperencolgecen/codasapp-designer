import type { CanvasComponentDefinition } from './types';
import '../../styles/components/DetailsComponent.css';

export const DetailsComponent: CanvasComponentDefinition = {
    defaultProps: { summary: 'Click to expand', text: 'Hidden content' },
    render: (props) => (
        <details className="canvas-cmp-details">
            <summary className="canvas-cmp-details__summary">{props.summary || 'Click to expand'}</summary>
            <div className="canvas-cmp-details__content">{props.text || 'Hidden content'}</div>
        </details>
    ),
};
