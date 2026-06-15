import type { CanvasComponentDefinition } from './types';
import '../../styles/components/PreCodeComponent.css';

export const PreCodeComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'code snippet' },
    render: (props) => (
        <pre className="canvas-cmp-pre">
            <code className="canvas-cmp-pre__code">{props.text || 'code snippet'}</code>
        </pre>
    ),
};
