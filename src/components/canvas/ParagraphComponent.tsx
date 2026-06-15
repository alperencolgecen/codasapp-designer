import type { CanvasComponentDefinition } from './types';
import '../../styles/components/ParagraphComponent.css';

export const ParagraphComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Paragraph text goes here.' },
    render: (props) => (
        <p className="canvas-cmp-paragraph">{props.text || 'Paragraph text goes here.'}</p>
    ),
};
