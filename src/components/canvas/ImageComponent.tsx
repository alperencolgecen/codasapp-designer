import type { CanvasComponentDefinition } from './types';
import '../../styles/components/ImageComponent.css';

export const ImageComponent: CanvasComponentDefinition = {
    defaultProps: { src: 'https://via.placeholder.com/150', alt: 'img' },
    render: (props) => (
        <img
            className="canvas-cmp-image"
            src={props.src || 'https://via.placeholder.com/150'}
            alt={props.alt || 'img'}
        />
    ),
};
