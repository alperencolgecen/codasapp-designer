import type { CanvasComponentDefinition } from './types';
import '../../styles/components/IframeComponent.css';

export const IframeComponent: CanvasComponentDefinition = {
    defaultProps: { src: 'https://example.com', title: 'Embedded content' },
    render: (props) => (
        <div className="canvas-cmp-iframe-wrapper">
            <iframe
                className="canvas-cmp-iframe"
                src={props.src || ''}
                title={props.title || 'Embedded content'}
                style={{ width: '100%', height: '100%', border: 'none' }}
                loading="lazy"
            />
        </div>
    ),
};
