import type { ComponentData } from '../types/component';

const styleToInline = (style: any = {}): string => {
    return Object.entries(style)
        .map(([key, value]) => {
            const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            return `${kebabKey}: ${value};`;
        })
        .join(' ');
};

const generateComponentHTML = (component: ComponentData): string => {
    const { type, props, children } = component;
    const { text, className, style } = props;

    const childHTML = children.map(generateComponentHTML).join('\n');

    // Ensure position is absolute if coordinates are present
    const finalStyle = { ...style };
    if (style?.left || style?.top) {
        finalStyle.position = 'absolute';
    }

    const inlineStyle = styleToInline(finalStyle);
    const idAttr = `id="${component.id}"`;
    const styleAttr = inlineStyle ? `style="${inlineStyle}"` : '';
    const classAttr = className ? `class="${className}"` : '';

    // Basic HTML mapping
    switch (type) {
        case 'container':
            return `<div ${idAttr} ${classAttr} ${styleAttr}>\n${childHTML}\n</div>`;
        case 'text':
            return `<div ${idAttr} ${classAttr} ${styleAttr}>${text || 'Metin'}</div>`;
        case 'button':
            return `<button ${idAttr} ${classAttr} ${styleAttr}>${text || 'Buton'}</button>`;
        case 'image':
            return `<img ${idAttr} ${classAttr} ${styleAttr} src="${props.src || 'https://via.placeholder.com/150'}" alt="Görsel" />`;
        case 'heading': {
            const level = Math.min(6, Math.max(1, props.level || 2));
            return `<h${level} ${idAttr} ${classAttr} ${styleAttr}>${props.text || 'Heading'}</h${level}>`;
        }
        case 'paragraph':
            return `<p ${idAttr} ${classAttr} ${styleAttr}>${props.text || 'Paragraph text goes here.'}</p>`;
        case 'span':
            return `<span ${idAttr} ${classAttr} ${styleAttr}>${props.text || 'Inline text'}</span>`;
        case 'blockquote': {
            const citeHtml = props.cite ? `<cite>${props.cite}</cite>` : '';
            return `<blockquote ${idAttr} ${classAttr} ${styleAttr}><p>${props.text || 'Blockquote citation'}</p>${citeHtml}</blockquote>`;
        }
        case 'precode':
            return `<pre ${idAttr} ${classAttr} ${styleAttr}><code>${props.text || 'code snippet'}</code></pre>`;
        case 'link':
            return `<a ${idAttr} ${classAttr} ${styleAttr} href="${props.href || '#'}">${props.text || 'Click here'}</a>`;
        case 'list': {
            const items = Array.isArray(props.items) && props.items.length > 0 ? props.items : ['Item 1', 'Item 2', 'Item 3'];
            const listTag = props.ordered ? 'ol' : 'ul';
            const listItems = items.map((item: string) => `<li>${item}</li>`).join('\n');
            return `<${listTag} ${idAttr} ${classAttr} ${styleAttr}>\n${listItems}\n</${listTag}>`;
        }
        case 'row':
            return `<div ${idAttr} class="flex flex-row ${className || ''}" ${styleAttr}>\n${childHTML}\n</div>`;
        case 'column':
            return `<div ${idAttr} class="flex flex-col ${className || ''}" ${styleAttr}>\n${childHTML}\n</div>`;
        default:
            return `<div ${idAttr} ${classAttr} ${styleAttr}>\n${childHTML}\n</div>`;
    }
};

export const generateFullHTML = (components: ComponentData[]) => {
    const bodyContent = components.map(generateComponentHTML).join('\n\n');

    return `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codasapp Export</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { 
            font-family: 'Quicksand', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            overflow-x: hidden;
        }
        * { box-sizing: border-box; }
    </style>
</head>
<body>
    ${bodyContent}
</body>
</html>`;
};

export const downloadProject = (components: ComponentData[]) => {
    const html = generateFullHTML(components);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'codasapp-proje.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

let previewWindow: Window | null = null;

export const previewInBrowser = (components: ComponentData[]) => {
    const html = generateFullHTML(components);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    if (previewWindow && !previewWindow.closed) {
        previewWindow.location.href = url;
    } else {
        previewWindow = window.open(url, 'codasapp-preview');
    }
};
