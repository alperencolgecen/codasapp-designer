import type { CanvasComponentDefinition } from './types';
import '../../styles/components/CheckboxComponent.css';

export const CheckboxComponent: CanvasComponentDefinition = {
    defaultProps: { label: 'Checkbox', checked: false },
    render: (props) => (
        <label className="canvas-cmp-checkbox-label">
            <input
                type="checkbox"
                className="canvas-cmp-checkbox"
                defaultChecked={!!props.checked}
                name={props.name}
            />
            <span className="canvas-cmp-checkbox__text">{props.label || 'Checkbox'}</span>
        </label>
    ),
};
