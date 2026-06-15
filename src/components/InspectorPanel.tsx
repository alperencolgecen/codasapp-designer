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
                    {/* ── Metin tabanlı componentler ── */}
                    {(selectedComponent.type === 'text' || selectedComponent.type === 'button' || 
                      selectedComponent.type === 'heading' || selectedComponent.type === 'paragraph' || 
                      selectedComponent.type === 'span' || selectedComponent.type === 'blockquote' || 
                      selectedComponent.type === 'precode' || selectedComponent.type === 'link') && (
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

                    {/* ── Heading level ── */}
                    {selectedComponent.type === 'heading' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Heading</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Seviye (h1-h6)</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={6}
                                    className="inspector-panel__input"
                                    value={selectedComponent.props.level ?? 2}
                                    onChange={(e) => handlePropChange('level', parseInt(e.target.value) || 2)}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Textarea rows ── */}
                    {selectedComponent.type === 'textarea' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Textarea</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Placeholder</label>
                                <input
                                    type="text"
                                    className="inspector-panel__input"
                                    value={selectedComponent.props.placeholder || ''}
                                    onChange={(e) => handlePropChange('placeholder', e.target.value)}
                                />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Satır sayısı</label>
                                <input
                                    type="number"
                                    min={1}
                                    className="inspector-panel__input"
                                    value={selectedComponent.props.rows ?? 4}
                                    onChange={(e) => handlePropChange('rows', parseInt(e.target.value) || 4)}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Select options ── */}
                    {selectedComponent.type === 'select' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Select</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Placeholder</label>
                                <input
                                    type="text"
                                    className="inspector-panel__input"
                                    value={selectedComponent.props.placeholder || ''}
                                    onChange={(e) => handlePropChange('placeholder', e.target.value)}
                                />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Seçenekler (her satır bir seçenek)</label>
                                <textarea
                                    className="inspector-panel__textarea"
                                    rows={4}
                                    value={Array.isArray(selectedComponent.props.options) ? selectedComponent.props.options.join('\n') : ''}
                                    onChange={(e) => handlePropChange('options', e.target.value.split('\n').filter((s: string) => s.trim()))}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Checkbox / Radio label ── */}
                    {(selectedComponent.type === 'checkbox' || selectedComponent.type === 'radio') && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">{selectedComponent.type === 'checkbox' ? 'Checkbox' : 'Radio'}</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Etiket</label>
                                <input
                                    type="text"
                                    className="inspector-panel__input"
                                    value={selectedComponent.props.label || ''}
                                    onChange={(e) => handlePropChange('label', e.target.value)}
                                />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Seçili</label>
                                <input
                                    type="checkbox"
                                    className="inspector-panel__checkbox"
                                    checked={!!selectedComponent.props.checked}
                                    onChange={(e) => handlePropChange('checked', e.target.checked)}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Label text ── */}
                    {selectedComponent.type === 'label' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Label</div>
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

                    {/* ── Blockquote cite ── */}
                    {selectedComponent.type === 'blockquote' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Alıntı</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Kaynak (cite)</label>
                                <input
                                    type="text"
                                    className="inspector-panel__input"
                                    value={selectedComponent.props.cite || ''}
                                    onChange={(e) => handlePropChange('cite', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Link href ── */}
                    {selectedComponent.type === 'link' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Link</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Hedef URL</label>
                                <input
                                    type="text"
                                    className="inspector-panel__input"
                                    value={selectedComponent.props.href || ''}
                                    onChange={(e) => handlePropChange('href', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── List items ── */}
                    {selectedComponent.type === 'list' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Liste</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Sıralı</label>
                                <input
                                    type="checkbox"
                                    className="inspector-panel__checkbox"
                                    checked={!!selectedComponent.props.ordered}
                                    onChange={(e) => handlePropChange('ordered', e.target.checked)}
                                />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Öğeler (her satır bir öğe)</label>
                                <textarea
                                    className="inspector-panel__textarea"
                                    rows={4}
                                    value={Array.isArray(selectedComponent.props.items) ? selectedComponent.props.items.join('\n') : ''}
                                    onChange={(e) => handlePropChange('items', e.target.value.split('\n').filter((s: string) => s.trim()))}
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
