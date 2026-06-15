import type { ComponentType } from '../types/component';

export const DEFAULT_SIZES: Record<string, { width: number; height: number }> = {
    container: { width: 200, height: 200 },
    text: { width: 120, height: 30 },
    button: { width: 100, height: 40 },
    image: { width: 150, height: 150 },
    row: { width: 300, height: 100 },
    column: { width: 100, height: 300 },
    input: { width: 200, height: 40 },
    card: { width: 250, height: 180 },
    icon: { width: 40, height: 40 },
    divider: { width: 200, height: 20 },
};

export const getDefaultSize = (type: string): { width: number; height: number } =>
    DEFAULT_SIZES[type] || { width: 100, height: 40 };
