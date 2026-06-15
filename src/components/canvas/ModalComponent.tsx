import { useState } from 'react';
import type { CanvasComponentDefinition } from './types';
import '../../styles/components/ModalComponent.css';

export const ModalComponent: CanvasComponentDefinition = {
    defaultProps: { buttonText: 'Open Modal', title: 'Modal Title', text: 'Modal content goes here.' },
    render: (props) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <button className="canvas-cmp-modal-trigger" onClick={() => setOpen(true)}>
                    {props.buttonText || 'Open Modal'}
                </button>
                {open && (
                    <div className="canvas-cmp-modal-overlay" onClick={() => setOpen(false)}>
                        <div className="canvas-cmp-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="canvas-cmp-modal__header">
                                <span className="canvas-cmp-modal__title">{props.title || 'Modal Title'}</span>
                                <button className="canvas-cmp-modal__close" onClick={() => setOpen(false)}>×</button>
                            </div>
                            <div className="canvas-cmp-modal__body">
                                {props.text || 'Modal content goes here.'}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    },
};
