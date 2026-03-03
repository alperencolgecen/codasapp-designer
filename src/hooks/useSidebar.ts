import { useCallback } from 'react';
import { Grid2X2, Box, Upload, Archive } from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';
import type { TabType } from '../context/BuilderContext';

const TAB_CONFIG = [
    { id: 'templates' as TabType, label: 'Kalıplar', icon: Grid2X2 },
    { id: 'elements' as TabType, label: 'Elementler', icon: Box },
    { id: 'uploads' as TabType, label: 'Kendi Dünyan', icon: Upload },
    { id: 'archive' as TabType, label: 'Arşiv', icon: Archive },
];

export const useSidebar = () => {
    const { activeTab, setActiveTab } = useBuilder();

    const handleTabClick = useCallback((tabId: TabType) => {
        if (activeTab === tabId) {
            setActiveTab(null);
        } else {
            setActiveTab(tabId);
        }
    }, [activeTab, setActiveTab]);

    return {
        activeTab,
        handleTabClick,
        TAB_CONFIG
    };
};
