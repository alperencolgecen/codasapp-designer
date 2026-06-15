import type { CanvasComponentDefinition } from './types';
import '../../styles/components/DividerComponent.css';

export const DividerComponent: CanvasComponentDefinition = {
    defaultProps: { orientation: 'horizontal', thickness: '2px' },
    render: (props) => {
        const isHorizontal = props.orientation !== 'vertical';
        return (
            <div
                className={`canvas-cmp-divider ${isHorizontal ? 'canvas-cmp-divider--h' : 'canvas-cmp-divider--v'}`}
                style={{
                    [isHorizontal ? 'height' : 'width']: props.thickness || '2px'
                }}
            />
        );
    },
};
