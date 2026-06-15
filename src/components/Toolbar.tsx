import React from 'react';
import { createPortal } from 'react-dom';
import { Undo2, Redo2, Download, Rocket, ChevronDown, Eye, ExternalLink } from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';
import { downloadProject, previewInBrowser } from '../utils/exporter';
import logoUrl from '../../assets/CodasApp-Designer.jpg';
import '../styles/Toolbar.css';

export const Toolbar: React.FC = () => {
    const { undo, redo, canUndo, canRedo, components, canvasHeight } = useBuilder();

    const logoRoot = document.getElementById('logo-portal');
    const menuRoot = document.getElementById('menu-portal');
    const titleRoot = document.getElementById('project-title-portal');
    const historyRoot = document.getElementById('history-portal');
    const actionsRoot = document.getElementById('actions-portal');

    return (
        <>
            {logoRoot && createPortal(
                <div className="toolbar__logo">
                    <img
                        src={logoUrl}
                        alt="CodasApp"
                        className="toolbar__logo-img"
                    />
                </div>,
                logoRoot
            )}

            {menuRoot && createPortal(
                <>
                    <div className="toolbar__menu-item">Dosya</div>
                    <div className="toolbar__menu-item">Düzenle</div>
                    <div
                        className="toolbar__menu-item"
                        onClick={() => previewInBrowser(components, canvasHeight)}
                        title="Tarayıcıda önizle"
                    >
                        <ExternalLink size={14} style={{ marginRight: 4 }} />
                        Görüntüle
                    </div>
                    <div className="toolbar__menu-item">Yardım</div>
                </>,
                menuRoot
            )}

            {titleRoot && createPortal(
                <>
                    <span>Adsız Proje</span>
                    <ChevronDown size={14} />
                </>,
                titleRoot
            )}

            {historyRoot && createPortal(
                <>
                    <button
                        onClick={undo}
                        disabled={!canUndo}
                        className="toolbar__btn"
                        title="Geri Al"
                    >
                        <Undo2 size={18} />
                    </button>
                    <button
                        onClick={redo}
                        disabled={!canRedo}
                        className="toolbar__btn"
                        title="İleri Al"
                    >
                        <Redo2 size={18} />
                    </button>
                </>,
                historyRoot
            )}

            {actionsRoot && createPortal(
                <>
                    <button
                        onClick={() => previewInBrowser(components, canvasHeight)}
                        className="toolbar__btn"
                        title="Tarayıcıda önizle"
                    >
                        <Eye size={18} />
                    </button>

                    <button
                        onClick={() => downloadProject(components, canvasHeight)}
                        className="toolbar__btn toolbar__btn--secondary"
                    >
                        <Download size={16} />
                        <span>Dışa Aktar</span>
                    </button>

                    <button className="toolbar__btn toolbar__btn--primary">
                        <Rocket size={16} />
                        <span>Yayınla</span>
                    </button>
                </>,
                actionsRoot
            )}
        </>
    );
};