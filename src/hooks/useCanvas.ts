import { useEffect, useCallback } from 'react';
import { useBuilder } from '../context/BuilderContext';
import type { ComponentData } from '../types/component';

export const useCanvas = (components: ComponentData[]) => {
    const {
        selectComponent,
        selectedId,
        deleteSelectedComponents,
        deselectAll
    } = useBuilder();

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (selectedId && (e.key === 'Delete' || e.key === 'Backspace')) {
            // Check if focused element is an input or textarea to avoid accidental deletion
            const activeElement = document.activeElement;
            const isInput = activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement;

            if (!isInput) {
                e.preventDefault();
                deleteSelectedComponents();
            }
        }

        if (e.key === 'Escape') {
            deselectAll();
        }
    }, [selectedId, deleteSelectedComponents, deselectAll]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const onCanvasClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            selectComponent(null);
        }
    }, [selectComponent]);

    return {
        selectedId,
        selectComponent,
        onCanvasClick
    };
};
