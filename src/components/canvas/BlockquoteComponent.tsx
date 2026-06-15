import type { CanvasComponentDefinition } from './types';
import '../../styles/components/BlockquoteComponent.css';

export const BlockquoteComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Blockquote citation', cite: '' },
    render: (props) => (
        <blockquote className="canvas-cmp-blockquote">
            <p className="canvas-cmp-blockquote__text">{props.text || 'Blockquote citation'}</p>
            {props.cite && <cite className="canvas-cmp-blockquote__cite">{props.cite}</cite>}
        </blockquote>
    ),
};
