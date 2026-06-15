import type { CanvasComponentDefinition } from './types';
import '../../styles/components/TextareaComponent.css';

export const TextareaComponent: CanvasComponentDefinition = {
    defaultProps: { placeholder: 'Enter text...', rows: 4 },
    render: (props) => (
        <textarea
            className="canvas-cmp-textarea"
            placeholder={props.placeholder || 'Enter text...'}
            rows={props.rows || 4}
            defaultValue={props.value || ''}
            name={props.name}
        />
    ),
};
