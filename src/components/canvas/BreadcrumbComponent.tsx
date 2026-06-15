import type { CanvasComponentDefinition } from './types';
import '../../styles/components/BreadcrumbComponent.css';

export const BreadcrumbComponent: CanvasComponentDefinition = {
    defaultProps: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'Category', href: '#' },
            { label: 'Current', href: '' },
        ],
    },
    render: (props) => {
        const items: { label: string; href: string }[] = Array.isArray(props.items) ? props.items : [];
        return (
            <nav className="canvas-cmp-breadcrumb">
                {items.map((item, i) => {
                    const isLast = i === items.length - 1;
                    return (
                        <span key={i} className="canvas-cmp-breadcrumb__item">
                            {isLast || !item.href ? (
                                <span className="canvas-cmp-breadcrumb__current">{item.label || 'Item'}</span>
                            ) : (
                                <a className="canvas-cmp-breadcrumb__link" href={item.href}>{item.label || 'Item'}</a>
                            )}
                            {!isLast && <span className="canvas-cmp-breadcrumb__sep">/</span>}
                        </span>
                    );
                })}
            </nav>
        );
    },
};
