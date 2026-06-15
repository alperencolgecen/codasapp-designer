import { useState } from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/TabsComponent.css';

export const TabsComponent: CanvasComponentDefinition = {
    defaultProps: {
        tabs: [
            { label: 'Tab 1', content: 'Content for tab 1' },
            { label: 'Tab 2', content: 'Content for tab 2' },
            { label: 'Tab 3', content: 'Content for tab 3' },
        ],
    },
    render: (props) => {
        const tabs: { label: string; content: string }[] = Array.isArray(props.tabs) ? props.tabs : [];
        const [active, setActive] = useState(0);
        return (
            <div className="canvas-cmp-tabs">
                <div className="canvas-cmp-tabs__headers">
                    {tabs.map((tab, i) => (
                        <button
                            key={i}
                            className={`canvas-cmp-tabs__tab ${i === active ? 'canvas-cmp-tabs__tab--active' : ''}`}
                            onClick={() => setActive(i)}
                        >
                            {tab.label || `Tab ${i + 1}`}
                        </button>
                    ))}
                </div>
                <div className="canvas-cmp-tabs__content">
                    {tabs[active]?.content || 'Content'}
                </div>
            </div>
        );
    },
};
