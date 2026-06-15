import type { CanvasComponentDefinition } from './types';
import '../../styles/components/AudioComponent.css';

export const AudioComponent: CanvasComponentDefinition = {
    defaultProps: { src: 'https://www.w3schools.com/html/horse.mp3', controls: true },
    render: (props) => (
        <div className="canvas-cmp-audio-wrapper">
            <audio
                className="canvas-cmp-audio"
                src={props.src || ''}
                controls={props.controls !== false}
                style={{ width: '100%' }}
            >
                Tarayıcınız audio etiketini desteklemiyor.
            </audio>
        </div>
    ),
};
