import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDroppable } from '@dnd-kit/core';
import type { ComponentData } from '../types/component';
import { MousePointer2, X, ChevronDown } from 'lucide-react';
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

    const [canvasHeight, setCanvasHeight] = useState<number | null>(null);
    const resizingRef = useRef(false);
    const startYRef = useRef(0);
    const startHRef = useRef(0);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        resizingRef.current = true;
        const paper = document.getElementById('canvas-paper');
        if (!paper) return;
        startYRef.current = e.clientY;
        startHRef.current = paper.offsetHeight;

        const handleMouseMove = (ev: MouseEvent) => {
            if (!resizingRef.current) return;
            const diff = ev.clientY - startYRef.current;
            setCanvasHeight(Math.max(400, startHRef.current + diff));
        };

        const handleMouseUp = () => {
            resizingRef.current = false;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none';
    }, []);

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
                style={canvasHeight ? { height: canvasHeight } : undefined}
            >
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
            <div className="canvas-resize-handle" onMouseDown={handleMouseDown}>
                <ChevronDown size={24} />
            </div>
            <div className="canvas-resize-spacer" />
        </div>,
        canvasRoot
    );
};
