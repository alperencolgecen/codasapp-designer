import type { CanvasComponentDefinition } from './types';
import '../../styles/components/FigureComponent.css';

export const FigureComponent: CanvasComponentDefinition = {
    defaultProps: { src: 'https://via.placeholder.com/300x200', alt: 'Figure image', caption: 'Figure caption' },
    render: (props) => (
        <figure className="canvas-cmp-figure">
            <img
                className="canvas-cmp-figure__img"
                src={props.src || 'https://via.placeholder.com/300x200'}
                alt={props.alt || 'Figure image'}
            />
            <figcaption className="canvas-cmp-figure__caption">
                {props.caption || 'Figure caption'}
            </figcaption>
        </figure>
    ),
};
