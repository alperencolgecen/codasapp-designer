import type { CanvasComponentDefinition } from './types';
import '../../styles/components/VideoComponent.css';

export const VideoComponent: CanvasComponentDefinition = {
    defaultProps: { src: 'https://www.w3schools.com/html/mov_bbb.mp4', controls: true, poster: '' },
    render: (props) => (
        <div className="canvas-cmp-video-wrapper">
            <video
                className="canvas-cmp-video"
                src={props.src || ''}
                controls={props.controls !== false}
                poster={props.poster || undefined}
                style={{ width: '100%' }}
            >
                Tarayıcınız video etiketini desteklemiyor.
            </video>
        </div>
    ),
};
