import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDroppable } from '@dnd-kit/core';
import type { ComponentData } from '../types/component';
import { MousePointer2, X, Minus, Plus, ChevronDown } from 'lucide-react';
import { useCanvas } from '../hooks/useCanvas';
import { useBuilder } from '../context/BuilderContext';
import { ComponentRenderer } from './ComponentRenderer';
import '../styles/CanvasArea.css';

const STEP = 3;
const INTERVAL = 40;

export const CanvasArea: React.FC<{ components: ComponentData[] }> = ({ components }) => {
    const { isPreviewMode, togglePreviewMode, selectComponent } = useBuilder();
    const { setNodeRef, isOver } = useDroppable({
        id: 'canvas-drop-zone',
    });

    const { selectedId, selectComponent: canvasSelect, onCanvasClick } = useCanvas(components);
    const canvasRoot = document.getElementById('canvas-root');

    const [canvasHeight, setCanvasHeight] = useState<number | null>(null);
    const heightRef = useRef(300);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const dragRef = useRef(false);
    const dragStartY = useRef(0);
    const dragStartH = useRef(0);

    const getCurrentHeight = useCallback(() => {
        const paper = document.getElementById('canvas-paper');
        return paper ? paper.offsetHeight : heightRef.current;
    }, []);

    const startHoverResize = useCallback((direction: 'shrink' | 'grow') => {
        if (timerRef.current || dragRef.current) return;
        heightRef.current = getCurrentHeight();

        timerRef.current = setInterval(() => {
            heightRef.current = heightRef.current + (direction === 'grow' ? STEP : -STEP);
            const clamped = Math.max(300, heightRef.current);
            heightRef.current = clamped;
            setCanvasHeight(clamped);
        }, INTERVAL);
    }, [getCurrentHeight]);

    const stopHoverResize = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const handleDragStart = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        stopHoverResize();
        dragRef.current = true;
        const paper = document.getElementById('canvas-paper');
        if (!paper) return;
        dragStartY.current = e.clientY;
        dragStartH.current = paper.offsetHeight;

        const onMove = (ev: MouseEvent) => {
            if (!dragRef.current) return;
            const diff = ev.clientY - dragStartY.current;
            const h = Math.max(300, dragStartH.current + diff);
            heightRef.current = h;
            setCanvasHeight(h);
        };

        const onUp = () => {
            dragRef.current = false;
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            document.body.style.cursor = '';
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        document.body.style.cursor = 'row-resize';
    }, [stopHoverResize]);

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
                <div className="canvas-paper-resize-handle" onMouseDown={handleDragStart}>
                    <ChevronDown size={18} />
                </div>
            </div>
            <div className="canvas-resize-bar">
                <div
                    className="canvas-resize-bar__left"
                    onMouseEnter={() => startHoverResize('shrink')}
                    onMouseLeave={stopHoverResize}
                >
                    <Minus size={16} />
                    <span>Azalt</span>
                </div>
                <div
                    className="canvas-resize-bar__right"
                    onMouseEnter={() => startHoverResize('grow')}
                    onMouseLeave={stopHoverResize}
                >
                    <span>Artır</span>
                    <Plus size={16} />
                </div>
            </div>
            <div className="canvas-resize-spacer" />
        </div>,
        canvasRoot
    );
};
