import type { CanvasComponentDefinition } from './types';
import '../../styles/components/ListComponent.css';

export const ListComponent: CanvasComponentDefinition = {
    defaultProps: { items: ['Item 1', 'Item 2', 'Item 3'], ordered: false },
    render: (props) => {
        const items: string[] = Array.isArray(props.items) && props.items.length > 0 ? props.items : ['Item 1', 'Item 2', 'Item 3'];
        const Tag = props.ordered ? 'ol' : 'ul';
        return (
            <Tag className={`canvas-cmp-list ${props.ordered ? 'canvas-cmp-list--ordered' : ''}`}>
                {items.map((item: string, i: number) => (
                    <li key={i} className="canvas-cmp-list__item">{item}</li>
                ))}
            </Tag>
        );
    },
};
