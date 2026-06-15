import type { CanvasComponentDefinition } from './types';
import '../../styles/components/TextComponent.css';

export const TextComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Text Element' },
    render: (props) => (
        <p className="canvas-cmp-text">{props.text || 'Text Element'}</p>
    ),
};
