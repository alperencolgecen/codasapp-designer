import type { ComponentType } from '../../types/component';
import type { CanvasComponentDefinition } from './types';
import { ContainerComponent } from './ContainerComponent';
import { TextComponent } from './TextComponent';
import { ButtonComponent } from './ButtonComponent';
import { ImageComponent } from './ImageComponent';
import { InputComponent } from './InputComponent';
import { CardComponent } from './CardComponent';
import { IconComponent } from './IconComponent';
import { DividerComponent } from './DividerComponent';
import { RowComponent } from './RowComponent';
import { ColumnComponent } from './ColumnComponent';

export const componentRegistry: Record<string, CanvasComponentDefinition> = {
    container: ContainerComponent,
    text: TextComponent,
    button: ButtonComponent,
    image: ImageComponent,
    input: InputComponent,
    card: CardComponent,
    icon: IconComponent,
    divider: DividerComponent,
    row: RowComponent,
    column: ColumnComponent,
};
