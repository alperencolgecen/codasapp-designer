import { v4 as uuidv4 } from 'uuid';
import type { ComponentData, ComponentType, ComponentProps, StateStyles } from '../types/component';

const createDefaultStateStyles = (): StateStyles => ({
    base: {},
    hover: {},
    active: {},
    focus: {},
});

export const createComponent = (
    type: ComponentType,
    props: ComponentProps = {},
    children: ComponentData[] = []
): ComponentData => {
    return {
        id: uuidv4(),
        type,
        props,
        children,
        parentId: null,
        stateStyles: createDefaultStateStyles(),
    };
};

export const createRootComponent = (): ComponentData => {
    return createComponent('container', {
        className: 'min-h-screen w-full bg-white p-4',
    });
};
