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
import { HeadingComponent } from './HeadingComponent';
import { ParagraphComponent } from './ParagraphComponent';
import { SpanComponent } from './SpanComponent';
import { BlockquoteComponent } from './BlockquoteComponent';
import { PreCodeComponent } from './PreCodeComponent';
import { LinkComponent } from './LinkComponent';
import { ListComponent } from './ListComponent';
import { TextareaComponent } from './TextareaComponent';
import { SelectComponent } from './SelectComponent';
import { CheckboxComponent } from './CheckboxComponent';
import { RadioComponent } from './RadioComponent';
import { LabelComponent } from './LabelComponent';

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
    heading: HeadingComponent,
    paragraph: ParagraphComponent,
    span: SpanComponent,
    blockquote: BlockquoteComponent,
    precode: PreCodeComponent,
    link: LinkComponent,
    list: ListComponent,
    textarea: TextareaComponent,
    select: SelectComponent,
    checkbox: CheckboxComponent,
    radio: RadioComponent,
    label: LabelComponent,
};
