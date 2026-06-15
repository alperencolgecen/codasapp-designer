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
        case 'textarea':
            return `<textarea ${idAttr} ${classAttr} ${styleAttr} placeholder="${props.placeholder || 'Enter text...'}" rows="${props.rows || 4}" name="${props.name || ''}">${props.value || ''}</textarea>`;
        case 'select': {
            const opts = Array.isArray(props.options) && props.options.length > 0 ? props.options : ['Option 1'];
            const optHtml = opts.map((o: string) => `<option value="${o}">${o}</option>`).join('\n');
            return `<select ${idAttr} ${classAttr} ${styleAttr} name="${props.name || ''}">\n${props.placeholder ? `<option value="" disabled>${props.placeholder}</option>\n` : ''}${optHtml}\n</select>`;
        }
        case 'checkbox':
            return `<label ${idAttr} ${classAttr} ${styleAttr}><input type="checkbox" ${props.checked ? 'checked' : ''} name="${props.name || ''}" /> ${props.label || 'Checkbox'}</label>`;
        case 'radio':
            return `<label ${idAttr} ${classAttr} ${styleAttr}><input type="radio" name="${props.name || 'radio'}" ${props.checked ? 'checked' : ''} /> ${props.label || 'Radio'}</label>`;
        case 'label':
            return `<label ${idAttr} ${classAttr} ${styleAttr} ${props.htmlFor ? `for="${props.htmlFor}"` : ''}>${props.text || 'Label'}</label>`;
        case 'navbar': {
            const navLinks = Array.isArray(props.links) ? props.links : [];
            const linksHtml = navLinks.map((l: { label?: string; href?: string }) =>
                `<a href="${l.href || '#'}" style="color:#cbd5e1;text-decoration:none;font-size:14px;">${l.label || 'Link'}</a>`
            ).join('\n');
            return `<nav ${idAttr} ${classAttr} ${styleAttr} style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#1e293b;border-radius:6px;color:#fff;min-height:48px;${inlineStyle}">\n<span style="font-weight:700;font-size:16px;color:#fff;">${props.brand || 'Brand'}</span>\n<div style="display:flex;gap:16px;">\n${linksHtml}\n</div>\n</nav>`;
        }
        case 'breadcrumb': {
            const bcItems = Array.isArray(props.items) ? props.items : [];
            const bcHtml = bcItems.map((item: { label?: string; href?: string }, i: number, arr: any[]) => {
                const isLast = i === arr.length - 1;
                const content = isLast || !item.href
                    ? `<span style="color:#6b7280;font-weight:500;">${item.label || 'Item'}</span>`
                    : `<a href="${item.href}" style="color:#3b82f6;text-decoration:none;">${item.label || 'Item'}</a>`;
                return `${content}${!isLast ? '<span style="color:#9ca3af;margin:0 4px;">/</span>' : ''}`;
            }).join('');
            return `<nav ${idAttr} ${classAttr} ${styleAttr} style="display:flex;align-items:center;gap:4px;padding:8px 12px;background:#f8fafc;border-radius:6px;font-size:14px;${inlineStyle}">\n${bcHtml}\n</nav>`;
        }
        case 'pagination': {
            const cur = props.current || 1;
            const total = props.total || 5;
            let pagesHtml = '<span style="...">‹</span>';
            for (let i = 1; i <= total; i++) {
                const activeStyle = i === cur ? 'background:#3b82f6;color:#fff;border-color:#3b82f6;' : '';
                pagesHtml += `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:32px;height:32px;padding:0 8px;border-radius:6px;font-size:14px;color:#1f2937;background:#fff;border:1px solid #d1d5db;cursor:pointer;${activeStyle}">${i}</span>`;
            }
            pagesHtml += '<span>›</span>';
            return `<nav ${idAttr} ${classAttr} style="display:flex;align-items:center;gap:4px;padding:8px 0;${inlineStyle}">\n${pagesHtml}\n</nav>`;
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
