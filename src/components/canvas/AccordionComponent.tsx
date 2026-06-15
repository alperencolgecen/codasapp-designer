import { useState } from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/AccordionComponent.css';

export const AccordionComponent: CanvasComponentDefinition = {
    defaultProps: {
        items: [
            { title: 'Section 1', content: 'Content for section 1' },
            { title: 'Section 2', content: 'Content for section 2' },
        ],
    },
    render: (props) => {
        const items: { title: string; content: string }[] = Array.isArray(props.items) ? props.items : [];
        const [openIndex, setOpenIndex] = useState<number | null>(0);
        return (
            <div className="canvas-cmp-accordion">
                {items.map((item, i) => (
                    <div key={i} className="canvas-cmp-accordion__item">
                        <button
                            className={`canvas-cmp-accordion__header ${i === openIndex ? 'canvas-cmp-accordion__header--open' : ''}`}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        >
                            <span>{item.title || `Section ${i + 1}`}</span>
                            <span className="canvas-cmp-accordion__arrow">{i === openIndex ? '−' : '+'}</span>
                        </button>
                        {i === openIndex && (
                            <div className="canvas-cmp-accordion__content">
                                {item.content || 'Content'}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    },
};
