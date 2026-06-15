import type { CanvasComponentDefinition } from './types';
import '../../styles/components/ButtonComponent.css';

export const ButtonComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Button' },
    render: (props) => (
        <button className="canvas-cmp-button">{props.text || 'Button'}</button>
    ),
};
