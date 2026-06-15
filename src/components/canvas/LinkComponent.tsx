import type { CanvasComponentDefinition } from './types';
import '../../styles/components/LinkComponent.css';

export const LinkComponent: CanvasComponentDefinition = {
    defaultProps: { text: 'Click here', href: '#' },
    render: (props) => (
        <a className="canvas-cmp-link" href={props.href || '#'}>{props.text || 'Click here'}</a>
    ),
};
