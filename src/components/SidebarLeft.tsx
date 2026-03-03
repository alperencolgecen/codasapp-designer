import { createPortal } from 'react-dom';
import { useSidebar } from '../hooks/useSidebar';
import { DraggableSidebarItem } from './DraggableSidebarItem';
import '../styles/SidebarLeft.css';

export const SidebarLeft = () => {
    const { activeTab, handleTabClick, TAB_CONFIG } = useSidebar();

    const tabsRoot = document.getElementById('sidebar-tabs-portal');
    const panelRoot = document.getElementById('sidebar-panel-portal');

    const renderTabContent = () => {
        if (!activeTab) return null;

        switch (activeTab) {
            case 'templates':
                return (
                    <div className="sidebar-left__panel-content">
                        <div className="sidebar-left__section">
                            <span className="sidebar-left__title">Şablonlar</span>
                            <p className="sidebar-left__empty-text">Hazır şablonlar yakında eklenecek</p>
                        </div>
                    </div>
                );

            case 'elements':
                return (
                    <div className="sidebar-left__panel-content">
                        <div className="sidebar-left__section">
                            <span className="sidebar-left__title">Temel</span>
                            <div className="sidebar-left__grid">
                                <DraggableSidebarItem type="container" label="Container" />
                                <DraggableSidebarItem type="text" label="Text" />
                                <DraggableSidebarItem type="button" label="Button" />
                                <DraggableSidebarItem type="image" label="Image" />
                            </div>
                        </div>

                        <div className="sidebar-left__section">
                            <span className="sidebar-left__title">Düzen</span>
                            <div className="sidebar-left__grid">
                                <DraggableSidebarItem type="row" label="Row" />
                                <DraggableSidebarItem type="column" label="Column" />
                            </div>
                        </div>
                    </div>
                );

            case 'uploads':
                return (
                    <div className="sidebar-left__panel-content">
                        <div className="sidebar-left__section">
                            <span className="sidebar-left__title">Yüklemelerim</span>
                            <p className="sidebar-left__empty-text">Henüz yükleme yok</p>
                        </div>
                    </div>
                );

            case 'archive':
                return (
                    <div className="sidebar-left__panel-content">
                        <div className="sidebar-left__section">
                            <span className="sidebar-left__title">Taslaklar</span>
                            <p className="sidebar-left__empty-text">Kaydedilmiş tasarım yok</p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            {tabsRoot && createPortal(
                <>
                    {TAB_CONFIG.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                className={`sidebar-left__tab-button ${isActive ? 'sidebar-left__tab-button--active' : ''}`}
                                onClick={() => handleTabClick(tab.id)}
                                title={tab.label}
                            >
                                <Icon size={20} className="sidebar-left__tab-icon" />
                                <span className="sidebar-left__tab-label">{tab.label}</span>
                            </button>
                        );
                    })}
                </>,
                tabsRoot
            )}

            {activeTab && panelRoot && createPortal(
                renderTabContent(),
                panelRoot
            )}
        </>
    );
};
