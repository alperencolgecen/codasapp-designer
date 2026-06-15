import type { CanvasComponentDefinition } from './types';
import '../../styles/components/IconComponent.css';

export const IconComponent: CanvasComponentDefinition = {
    defaultProps: { icon: '⭐', size: 'medium' },
    render: (props) => {
        const iconSize = props.size === 'small' ? '16px'
            : props.size === 'medium' ? '24px'
                : props.size === 'large' ? '32px'
                    : props.size === 'xlarge' ? '48px' : '24px';
        return (
            <span className="canvas-cmp-icon" style={{ fontSize: iconSize }}>
                {props.icon || '⭐'}
            </span>
        );
    },
};
