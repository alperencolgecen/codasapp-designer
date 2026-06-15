import type { CanvasComponentDefinition } from './types';
import '../../styles/components/AvatarComponent.css';

const getInitials = (name: string): string => {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
};

export const AvatarComponent: CanvasComponentDefinition = {
    defaultProps: { src: '', name: 'User', size: 'medium' },
    render: (props) => {
        const sizeMap: Record<string, number> = { small: 32, medium: 40, large: 56, xlarge: 72 };
        const px = sizeMap[props.size || 'medium'] || 40;
        return (
            <div className="canvas-cmp-avatar" style={{ width: px, height: px }}>
                {props.src ? (
                    <img className="canvas-cmp-avatar__img" src={props.src} alt={props.name || 'Avatar'} />
                ) : (
                    <span className="canvas-cmp-avatar__initials" style={{ fontSize: px * 0.4 }}>
                        {getInitials(props.name || 'User')}
                    </span>
                )}
            </div>
        );
    },
};
