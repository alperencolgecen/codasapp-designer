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

    const getCurrentHeight = useCallback(() => {
        const paper = document.getElementById('canvas-paper');
        return paper ? paper.offsetHeight : heightRef.current;
    }, []);

    const startResize = useCallback((direction: 'shrink' | 'grow') => {
        if (timerRef.current) return;
        heightRef.current = getCurrentHeight();

        timerRef.current = setInterval(() => {
            heightRef.current = heightRef.current + (direction === 'grow' ? STEP : -STEP);
            const clamped = Math.max(300, heightRef.current);
            heightRef.current = clamped;
            setCanvasHeight(clamped);
        }, INTERVAL);
    }, [getCurrentHeight]);

    const stopResize = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
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
            <div className="canvas-resize-bar">
                <div className="canvas-resize-handle">
                    <ChevronDown size={20} />
                </div>
                <div
                    className="canvas-resize-bar__left"
                    onMouseEnter={() => startResize('shrink')}
                    onMouseLeave={stopResize}
                >
                    <Minus size={16} />
                    <span>Azalt</span>
                </div>
                <div
                    className="canvas-resize-bar__right"
                    onMouseEnter={() => startResize('grow')}
                    onMouseLeave={stopResize}
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
