export type ComponentType = 'container' | 'text' | 'button' | 'image' | 'row' | 'column' | 'input' | 'card' | 'icon' | 'divider';

export type StyleState = 'base' | 'hover' | 'active' | 'focus';

export interface ComponentStyle {
    [key: string]: string | number | undefined;
}

export interface StateStyles {
    base: ComponentStyle;
    hover: ComponentStyle;
    active: ComponentStyle;
    focus: ComponentStyle;
}

export interface ComponentProps {
    className?: string;
    text?: string;
    src?: string;
    alt?: string;
    href?: string;
    style?: ComponentStyle;
    // Input props
    placeholder?: string;
    type?: string;
    value?: string;
    name?: string;
    // Card props
    title?: string;
    subtitle?: string;
    // Icon props
    icon?: string;
    size?: string;
    // Divider props
    orientation?: 'horizontal' | 'vertical';
    thickness?: string;
    [key: string]: any;
}

export interface ComponentData {
    id: string;
    type: ComponentType;
    props: ComponentProps;
    children: ComponentData[];
    parentId?: string | null;
    stateStyles: StateStyles;
}

export interface PageData {
    id: string;
    name: string;
    rootComponent: ComponentData;
}

export interface BuilderState {
    components: ComponentData[];
    selectedComponent: string | null;
    draggedComponent: ComponentData | null;
    history: ComponentData[][];
    historyIndex: number;
}
