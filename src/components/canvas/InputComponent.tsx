import type { CanvasComponentDefinition } from './types';
import '../../styles/components/InputComponent.css';

export const InputComponent: CanvasComponentDefinition = {
    defaultProps: { placeholder: 'Enter text...', type: 'text' },
    render: (props) => (
        <input
            className="canvas-cmp-input"
            type={props.type || 'text'}
            placeholder={props.placeholder || 'Enter text...'}
            defaultValue={props.value || ''}
            name={props.name}
        />
    ),
};
