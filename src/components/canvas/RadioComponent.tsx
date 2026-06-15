import type { CanvasComponentDefinition } from './types';
import '../../styles/components/RadioComponent.css';

export const RadioComponent: CanvasComponentDefinition = {
    defaultProps: { label: 'Radio', name: 'radio', checked: false },
    render: (props) => (
        <label className="canvas-cmp-radio-label">
            <input
                type="radio"
                className="canvas-cmp-radio"
                name={props.name || 'radio'}
                defaultChecked={!!props.checked}
            />
            <span className="canvas-cmp-radio__text">{props.label || 'Radio'}</span>
        </label>
    ),
};
