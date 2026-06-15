import type { CanvasComponentDefinition } from './types';
import '../../styles/components/LabelComponent.css';

export const LabelComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Label', htmlFor: '' },
    render: (props) => (
        <label className="canvas-cmp-label" htmlFor={props.htmlFor || ''}>
            {props.text || 'Label'}
        </label>
    ),
};
