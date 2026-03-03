import React from 'react';
import { createPortal } from 'react-dom';
import { Settings2 } from 'lucide-react';
import { useInspector } from '../hooks/useInspector';
import type { StyleState } from '../types/component';
import '../styles/InspectorPanel.css';

export const InspectorPanel: React.FC = () => {
    const {
        selectedComponent,
        activeStyleState,
        setActiveStyleState,
        handlePropChange,
        handleStyleChange,
        getStyleValue
    } = useInspector();

    const headerRoot = document.getElementById('inspector-header-portal');
    const tabsRoot = document.getElementById('inspector-tabs-portal');
    const contentRoot = document.getElementById('inspector-content-portal');

    if (!selectedComponent) {
        return (
            <>
                {contentRoot && createPortal(
                    <div className="inspector-panel__empty">
                        <Settings2 size={32} />
                        <h3 className="inspector-panel__title">Özellikler</h3>
                        <p className="inspector-panel__text">Düzenlemek için bir öğe seçin</p>
                    </div>,
                    contentRoot
                )}
            </>
        );
    }

    return (
        <>
            {headerRoot && createPortal(
                <div className="inspector-panel__title-box">
                    <span className="inspector-panel__title">Özellikler</span>
                    <span className="inspector-panel__badge">{selectedComponent.type}</span>
                </div>,
                headerRoot
            )}

            {tabsRoot && createPortal(
                <>
                    {(['base', 'hover', 'active', 'focus'] as StyleState[]).map(state => (
                        <button
                            key={state}
                            className={`inspector-panel__tab ${activeStyleState === state ? 'inspector-panel__tab--active' : ''}`}
                            onClick={() => setActiveStyleState(state)}
                        >
                            {state === 'base' ? 'Normal' : state}
                        </button>
                    ))}
                </>,
                tabsRoot
            )}

            {contentRoot && createPortal(
                <>
                    {(selectedComponent.type === 'text' || selectedComponent.type === 'button') && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">İçerik</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Metin</label>
                                <input
                                    type="text"
                                    className="inspector-panel__input"
                                    value={selectedComponent.props.text || ''}
                                    onChange={(e) => handlePropChange('text', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    <div className="inspector-panel__section">
                        <div className="inspector-panel__section-title">Görünüm</div>
                        <div className="inspector-panel__field">
                            <label className="inspector-panel__label">Arkaplan</label>
                            <input
                                type="color"
                                className="inspector-panel__input"
                                value={getStyleValue('backgroundColor') || '#ffffff'}
                                onChange={(e) => handleStyleChange({ backgroundColor: e.target.value })}
                            />
                        </div>
                        <div className="inspector-panel__field">
                            <label className="inspector-panel__label">Metin Rengi</label>
                            <input
                                type="color"
                                className="inspector-panel__input"
                                value={getStyleValue('color') || '#000000'}
                                onChange={(e) => handleStyleChange({ color: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="inspector-panel__section">
                        <div className="inspector-panel__section-title">Düzen</div>
                        <div className="inspector-panel__grid">
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Genişlik</label>
                                <input
                                    type="text"
                                    className="inspector-panel__input"
                                    value={getStyleValue('width') || 'auto'}
                                    onChange={(e) => handleStyleChange({ width: e.target.value })}
                                />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Yükseklik</label>
                                <input
                                    type="text"
                                    className="inspector-panel__input"
                                    value={getStyleValue('height') || 'auto'}
                                    onChange={(e) => handleStyleChange({ height: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </>,
                contentRoot
            )}
        </>
    );
};

// export default InspectorPanel; // Removed default export to favor named export for consistency
