import React from 'react';
import { createPortal } from 'react-dom';
import { useDroppable } from '@dnd-kit/core';
import type { ComponentData } from '../types/component';
import { MousePointer2, X } from 'lucide-react';
import { useCanvas } from '../hooks/useCanvas';
import { useBuilder } from '../context/BuilderContext';
import { ComponentRenderer } from './ComponentRenderer';
import '../styles/CanvasArea.css';

export const CanvasArea: React.FC<{ components: ComponentData[] }> = ({ components }) => {
    const { isPreviewMode, togglePreviewMode, selectComponent } = useBuilder();
    const { setNodeRef, isOver } = useDroppable({
        id: 'canvas-drop-zone',
    });

    const { selectedId, selectComponent: canvasSelect, onCanvasClick } = useCanvas(components);
    const canvasRoot = document.getElementById('canvas-root');

    if (!canvasRoot) return null;

    return createPortal(
        <div
            className={`canvas-workspace ${isPreviewMode ? 'canvas--preview' : ''}`}
            onClick={() => selectComponent(null)}
        >
            {isPreviewMode && (
                <button
                    onClick={togglePreviewMode}
                    className="preview-close-btn"
                    title="Close Preview"
                >
                    <X size={20} />
                </button>
            )}
            <div
                id="canvas-paper"
                ref={setNodeRef}
                className={`canvas-paper ${isOver ? 'canvas-paper--droppable' : ''}`}
                onClick={onCanvasClick}
            >
                <div className="canvas-content">
                    {components.length > 0 ? (
                        components.map(component => (
                            <ComponentRenderer
                                key={component.id}
                                component={component}
                                selectedId={selectedId}
                                selectComponent={canvasSelect}
                            />
                        ))
                    ) : (
                        <div className="canvas-empty">
                            <div className="canvas-empty__icon">
                                <MousePointer2 size={32} />
                            </div>
                            <h3 className="canvas-empty__title">Canvas Boş</h3>
                            <p className="canvas-empty__text">Sol panelden bileşenleri sürükleyip buraya bırakın</p>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        canvasRoot
    );
};
