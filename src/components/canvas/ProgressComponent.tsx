import type { CanvasComponentDefinition } from './types';
import '../../styles/components/ProgressComponent.css';

export const ProgressComponent: CanvasComponentDefinition = {
    defaultProps: { value: 60, max: 100, label: '60%' },
    render: (props) => {
        const value = Math.max(0, Math.min(props.max || 100, props.value || 0));
        const max = props.max || 100;
        const pct = max > 0 ? Math.round((value / max) * 100) : 0;
        return (
            <div className="canvas-cmp-progress">
                <div className="canvas-cmp-progress__bg">
                    <div className="canvas-cmp-progress__bar" style={{ width: `${pct}%` }} />
                </div>
                <span className="canvas-cmp-progress__label">{props.label || `${pct}%`}</span>
            </div>
        );
    },
};
