import type { CanvasComponentDefinition } from './types';
import '../../styles/components/BadgeComponent.css';

export const BadgeComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Badge', variant: 'default' },
    render: (props) => (
        <span className={`canvas-cmp-badge canvas-cmp-badge--${props.variant || 'default'}`}>
            {props.text || 'Badge'}
        </span>
    ),
};
