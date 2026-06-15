import type { CanvasComponentDefinition } from './types';
import '../../styles/components/PaginationComponent.css';

export const PaginationComponent: CanvasComponentDefinition = {
    defaultProps: { current: 1, total: 5 },
    render: (props) => {
        const current = props.current || 1;
        const total = props.total || 5;
        const pages: number[] = [];
        for (let i = 1; i <= total; i++) pages.push(i);

        return (
            <nav className="canvas-cmp-pagination">
                <span className="canvas-cmp-pagination__item canvas-cmp-pagination__item--prev">‹</span>
                {pages.map((p) => (
                    <span
                        key={p}
                        className={`canvas-cmp-pagination__item ${p === current ? 'canvas-cmp-pagination__item--active' : ''}`}
                    >
                        {p}
                    </span>
                ))}
                <span className="canvas-cmp-pagination__item canvas-cmp-pagination__item--next">›</span>
            </nav>
        );
    },
};
