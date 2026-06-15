import type { CanvasComponentDefinition } from './types';
import '../../styles/components/SelectComponent.css';

export const SelectComponent: CanvasComponentDefinition = {
    defaultProps: { options: ['Option 1', 'Option 2', 'Option 3'], placeholder: 'Select...' },
    render: (props) => {
        const options: string[] = Array.isArray(props.options) && props.options.length > 0 ? props.options : ['Option 1', 'Option 2', 'Option 3'];
        return (
            <select className="canvas-cmp-select" defaultValue="" name={props.name}>
                {props.placeholder && <option value="" disabled>{props.placeholder}</option>}
                {options.map((opt: string, i: number) => (
                    <option key={i} value={opt}>{opt}</option>
                ))}
            </select>
        );
    },
};
