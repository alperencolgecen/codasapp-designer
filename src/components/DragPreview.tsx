import React from 'react';
import type { ComponentType } from '../types/component';
import { Box, Image as ImageIcon, MousePointerClick } from 'lucide-react';

interface DragPreviewProps {
    type: ComponentType;
}

export const DragPreview: React.FC<DragPreviewProps> = ({ type }) => {
    const renderPreview = () => {
        switch (type) {
            case 'button':
                return (
                    <button className="preview-element preview-element--button">
                        Buton
                    </button>
                );

            case 'text':
                return (
                    <p className="preview-element preview-element--text">
                        Metin Öğesi
                    </p>
                );

            case 'container':
                return (
                    <div className="preview-element preview-element--container">
                        <Box size={32} />
                    </div>
                );

            case 'image':
                return (
                    <div className="preview-element preview-element--image">
                        <ImageIcon size={48} />
                    </div>
                );

            case 'row':
                return (
                    <div className="preview-element preview-element--row">
                        <div className="preview-element__sub" />
                        <div className="preview-element__sub" />
                    </div>
                );

            case 'column':
                return (
                    <div className="preview-element preview-element--column">
                        <div className="preview-element__sub" />
                        <div className="preview-element__sub" />
                    </div>
                );

            default:
                return (
                    <div className="preview-element">
                        <MousePointerClick size={24} />
                    </div>
                );
        }
    };

    return (
        <div className="drag-preview">
            {renderPreview()}
        </div>
    );
};
