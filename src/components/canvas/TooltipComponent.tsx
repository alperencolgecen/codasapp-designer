import type { CanvasComponentDefinition } from './types';
import '../../styles/components/TooltipComponent.css';

export const TooltipComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Tooltip text', position: 'top' },
    render: (props) => (
        <div className={`canvas-cmp-tooltip-wrapper canvas-cmp-tooltip-wrapper--${props.position || 'top'}`}>
            <span className="canvas-cmp-tooltip-target">{props.trigger || 'Hover me'}</span>
            <span className="canvas-cmp-tooltip">{props.text || 'Tooltip text'}</span>
        </div>
    ),
};
