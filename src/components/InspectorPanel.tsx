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

                    {/* ── Image src / alt ── */}
                    {selectedComponent.type === 'image' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Görsel</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Kaynak (URL)</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.src || ''} onChange={(e) => handlePropChange('src', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Alt metni</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.alt || ''} onChange={(e) => handlePropChange('alt', e.target.value)} />
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

                    {/* ── Navbar brand + links ── */}
                    {selectedComponent.type === 'navbar' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Navbar</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Marka</label>
                                <input
                                    type="text"
                                    className="inspector-panel__input"
                                    value={selectedComponent.props.brand || ''}
                                    onChange={(e) => handlePropChange('brand', e.target.value)}
                                />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Linkler (her satır: etiket,url)</label>
                                <textarea
                                    className="inspector-panel__textarea"
                                    rows={4}
                                    value={Array.isArray(selectedComponent.props.links) ? selectedComponent.props.links.map((l: { label: string; href: string }) => `${l.label},${l.href}`).join('\n') : ''}
                                    onChange={(e) => {
                                        const items = e.target.value.split('\n').filter(Boolean).map((line: string) => {
                                            const [label = 'Link', href = '#'] = line.split(',');
                                            return { label: label.trim(), href: href.trim() };
                                        });
                                        handlePropChange('links', items);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Breadcrumb items ── */}
                    {selectedComponent.type === 'breadcrumb' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Breadcrumb</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Öğeler (her satır: etiket,url)</label>
                                <textarea
                                    className="inspector-panel__textarea"
                                    rows={4}
                                    value={Array.isArray(selectedComponent.props.items) ? selectedComponent.props.items.map((i: { label: string; href: string }) => `${i.label},${i.href}`).join('\n') : ''}
                                    onChange={(e) => {
                                        const items = e.target.value.split('\n').filter(Boolean).map((line: string) => {
                                            const [label = 'Item', href = '#'] = line.split(',');
                                            return { label: label.trim(), href: href.trim() };
                                        });
                                        handlePropChange('items', items);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Pagination current/total ── */}
                    {selectedComponent.type === 'pagination' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Pagination</div>
                            <div className="inspector-panel__grid">
                                <div className="inspector-panel__field">
                                    <label className="inspector-panel__label">Aktif Sayfa</label>
                                    <input
                                        type="number"
                                        min={1}
                                        className="inspector-panel__input"
                                        value={selectedComponent.props.current ?? 1}
                                        onChange={(e) => handlePropChange('current', parseInt(e.target.value) || 1)}
                                    />
                                </div>
                                <div className="inspector-panel__field">
                                    <label className="inspector-panel__label">Toplam Sayfa</label>
                                    <input
                                        type="number"
                                        min={1}
                                        className="inspector-panel__input"
                                        value={selectedComponent.props.total ?? 5}
                                        onChange={(e) => handlePropChange('total', parseInt(e.target.value) || 5)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Video src / poster ── */}
                    {selectedComponent.type === 'video' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Video</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Kaynak (URL)</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.src || ''} onChange={(e) => handlePropChange('src', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Poster (URL)</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.poster || ''} onChange={(e) => handlePropChange('poster', e.target.value)} />
                            </div>
                        </div>
                    )}

                    {/* ── Iframe src / title ── */}
                    {selectedComponent.type === 'iframe' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Iframe</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Kaynak (URL)</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.src || ''} onChange={(e) => handlePropChange('src', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Başlık</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.title || ''} onChange={(e) => handlePropChange('title', e.target.value)} />
                            </div>
                        </div>
                    )}

                    {/* ── Audio src ── */}
                    {selectedComponent.type === 'audio' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Audio</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Kaynak (URL)</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.src || ''} onChange={(e) => handlePropChange('src', e.target.value)} />
                            </div>
                        </div>
                    )}

                    {/* ── Figure src / alt / caption ── */}
                    {selectedComponent.type === 'figure' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Figure</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Görsel (URL)</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.src || ''} onChange={(e) => handlePropChange('src', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Alt metni</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.alt || ''} onChange={(e) => handlePropChange('alt', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Altyazı</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.caption || ''} onChange={(e) => handlePropChange('caption', e.target.value)} />
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

                    {/* ── Details summary + text ── */}
                    {selectedComponent.type === 'details' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Details</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Özet (summary)</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.summary || ''} onChange={(e) => handlePropChange('summary', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">İçerik</label>
                                <textarea className="inspector-panel__textarea" rows={3} value={selectedComponent.props.text || ''} onChange={(e) => handlePropChange('text', e.target.value)} />
                            </div>
                        </div>
                    )}

                    {/* ── Tabs ── */}
                    {selectedComponent.type === 'tabs' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Tabs</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Sekmeler (her satır: etiket,içerik)</label>
                                <textarea
                                    className="inspector-panel__textarea"
                                    rows={5}
                                    value={Array.isArray(selectedComponent.props.tabs) ? selectedComponent.props.tabs.map((t: { label: string; content: string }) => `${t.label},${t.content}`).join('\n') : ''}
                                    onChange={(e) => {
                                        const tabs = e.target.value.split('\n').filter(Boolean).map((line: string) => {
                                            const [label = 'Tab', content = 'Content'] = line.split(',');
                                            return { label: label.trim(), content: content.trim() };
                                        });
                                        handlePropChange('tabs', tabs);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Accordion ── */}
                    {selectedComponent.type === 'accordion' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Accordion</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Öğeler (her satır: başlık,içerik)</label>
                                <textarea
                                    className="inspector-panel__textarea"
                                    rows={5}
                                    value={Array.isArray(selectedComponent.props.items) ? selectedComponent.props.items.map((i: { title: string; content: string }) => `${i.title},${i.content}`).join('\n') : ''}
                                    onChange={(e) => {
                                        const items = e.target.value.split('\n').filter(Boolean).map((line: string) => {
                                            const [title = 'Section', content = 'Content'] = line.split(',');
                                            return { title: title.trim(), content: content.trim() };
                                        });
                                        handlePropChange('items', items);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Modal ── */}
                    {selectedComponent.type === 'modal' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Modal</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Buton Metni</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.buttonText || ''} onChange={(e) => handlePropChange('buttonText', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Başlık</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.title || ''} onChange={(e) => handlePropChange('title', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">İçerik</label>
                                <textarea className="inspector-panel__textarea" rows={3} value={selectedComponent.props.text || ''} onChange={(e) => handlePropChange('text', e.target.value)} />
                            </div>
                        </div>
                    )}

                    {/* ── Tooltip ── */}
                    {selectedComponent.type === 'tooltip' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Tooltip</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Tetikleyici Metin</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.trigger || ''} onChange={(e) => handlePropChange('trigger', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Tooltip Metni</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.text || ''} onChange={(e) => handlePropChange('text', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Konum</label>
                                <select className="inspector-panel__select" value={selectedComponent.props.position || 'top'} onChange={(e) => handlePropChange('position', e.target.value)}>
                                    <option value="top">Üst</option>
                                    <option value="bottom">Alt</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* ── Table ── */}
                    {selectedComponent.type === 'table' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Table</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Sütun Başlıkları (virgülle ayır)</label>
                                <input type="text" className="inspector-panel__input" value={Array.isArray(selectedComponent.props.headers) ? selectedComponent.props.headers.join(', ') : ''} onChange={(e) => handlePropChange('headers', e.target.value.split(',').map((s: string) => s.trim()))} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Satırlar (her satır: değer1,değer2,...)</label>
                                <textarea
                                    className="inspector-panel__textarea"
                                    rows={5}
                                    value={Array.isArray(selectedComponent.props.rows) ? selectedComponent.props.rows.map((r: string[]) => r.join(',')).join('\n') : ''}
                                    onChange={(e) => {
                                        const rows = e.target.value.split('\n').filter(Boolean).map((line: string) => line.split(',').map((s: string) => s.trim()));
                                        handlePropChange('rows', rows);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Progress ── */}
                    {selectedComponent.type === 'progress' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Progress Bar</div>
                            <div className="inspector-panel__grid">
                                <div className="inspector-panel__field">
                                    <label className="inspector-panel__label">Değer</label>
                                    <input type="number" min={0} className="inspector-panel__input" value={selectedComponent.props.value ?? 60} onChange={(e) => handlePropChange('value', parseInt(e.target.value) || 0)} />
                                </div>
                                <div className="inspector-panel__field">
                                    <label className="inspector-panel__label">Maksimum</label>
                                    <input type="number" min={1} className="inspector-panel__input" value={selectedComponent.props.max ?? 100} onChange={(e) => handlePropChange('max', parseInt(e.target.value) || 100)} />
                                </div>
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Etiket</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.label || ''} onChange={(e) => handlePropChange('label', e.target.value)} />
                            </div>
                        </div>
                    )}

                    {/* ── Badge ── */}
                    {selectedComponent.type === 'badge' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Badge</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Metin</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.text || ''} onChange={(e) => handlePropChange('text', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Varyant</label>
                                <select className="inspector-panel__select" value={selectedComponent.props.variant || 'default'} onChange={(e) => handlePropChange('variant', e.target.value)}>
                                    <option value="default">Default</option>
                                    <option value="primary">Primary</option>
                                    <option value="success">Success</option>
                                    <option value="warning">Warning</option>
                                    <option value="danger">Danger</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* ── Avatar ── */}
                    {selectedComponent.type === 'avatar' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Avatar</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Görsel (URL)</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.src || ''} onChange={(e) => handlePropChange('src', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">İsim (baş harfler)</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.name || ''} onChange={(e) => handlePropChange('name', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Boyut</label>
                                <select className="inspector-panel__select" value={selectedComponent.props.size || 'medium'} onChange={(e) => handlePropChange('size', e.target.value)}>
                                    <option value="small">Small (32px)</option>
                                    <option value="medium">Medium (40px)</option>
                                    <option value="large">Large (56px)</option>
                                    <option value="xlarge">XLarge (72px)</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* ── Alert ── */}
                    {selectedComponent.type === 'alert' && (
                        <div className="inspector-panel__section">
                            <div className="inspector-panel__section-title">Alert</div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Metin</label>
                                <input type="text" className="inspector-panel__input" value={selectedComponent.props.text || ''} onChange={(e) => handlePropChange('text', e.target.value)} />
                            </div>
                            <div className="inspector-panel__field">
                                <label className="inspector-panel__label">Varyant</label>
                                <select className="inspector-panel__select" value={selectedComponent.props.variant || 'info'} onChange={(e) => handlePropChange('variant', e.target.value)}>
                                    <option value="info">Info</option>
                                    <option value="success">Success</option>
                                    <option value="warning">Warning</option>
                                    <option value="danger">Danger</option>
                                </select>
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
