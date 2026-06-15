import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDroppable } from '@dnd-kit/core';
import type { ComponentData } from '../types/component';
import { MousePointer2, X, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
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
    const [dragDir, setDragDir] = useState<'left' | 'right'>('right');
    const resizingRef = useRef(false);
    const startXRef = useRef(0);
    const startHRef = useRef(0);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        resizingRef.current = true;
        const paper = document.getElementById('canvas-paper');
        if (!paper) return;
        startXRef.current = e.clientX;
        startHRef.current = paper.offsetHeight;
        setDragDir('right');

        const handleMouseMove = (ev: MouseEvent) => {
            if (!resizingRef.current) return;
            setDragDir(ev.clientX >= startXRef.current ? 'right' : 'left');
            const diff = ev.clientX - startXRef.current;
            setCanvasHeight(Math.max(300, startHRef.current + diff));
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
        document.body.style.cursor = 'ew-resize';
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
            <div className="canvas-resize-bar" onMouseDown={handleMouseDown}>
                <div className="canvas-resize-handle">
                    {dragDir === 'right' ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                </div>
                <div className="canvas-resize-bar__left">
                    <Minus size={16} />
                    <span>Azalt</span>
                </div>
                <div className="canvas-resize-bar__right">
                    <span>Artır</span>
                    <Plus size={16} />
                </div>
            </div>
            <div className="canvas-resize-spacer" />
        </div>,
        canvasRoot
    );
};
