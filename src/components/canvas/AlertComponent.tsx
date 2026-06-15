import type { CanvasComponentDefinition } from './types';
import '../../styles/components/AlertComponent.css';

export const AlertComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'This is an alert message.', variant: 'info' },
    render: (props) => (
        <div className={`canvas-cmp-alert canvas-cmp-alert--${props.variant || 'info'}`}>
            <span className="canvas-cmp-alert__text">{props.text || 'This is an alert message.'}</span>
        </div>
    ),
};
