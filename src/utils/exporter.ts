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
        case 'video':
            return `<div ${idAttr} ${styleAttr} style="background:#000;border-radius:6px;overflow:hidden;${inlineStyle}"><video src="${props.src || ''}" ${props.controls !== false ? 'controls' : ''} ${props.poster ? `poster="${props.poster}"` : ''} style="display:block;max-width:100%;">Tarayıcınız video etiketini desteklemiyor.</video></div>`;
        case 'iframe':
            return `<div ${idAttr} ${styleAttr} style="min-height:200px;border-radius:6px;overflow:hidden;background:#f1f5f9;border:1px solid #e2e8f0;${inlineStyle}"><iframe src="${props.src || ''}" title="${props.title || 'Embedded content'}" style="width:100%;height:100%;border:none;" loading="lazy"></iframe></div>`;
        case 'audio':
            return `<div ${idAttr} ${styleAttr} style="background:#f8fafc;border-radius:6px;padding:12px 16px;border:1px solid #e2e8f0;${inlineStyle}"><audio src="${props.src || ''}" ${props.controls !== false ? 'controls' : ''} style="display:block;width:100%;">Tarayıcınız audio etiketini desteklemiyor.</audio></div>`;
        case 'figure':
            return `<figure ${idAttr} ${classAttr} ${styleAttr} style="margin:0;padding:8px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;text-align:center;${inlineStyle}"><img src="${props.src || 'https://via.placeholder.com/300x200'}" alt="${props.alt || 'Figure image'}" style="max-width:100%;height:auto;border-radius:4px;display:block;" /><figcaption style="margin-top:8px;font-size:13px;color:#6b7280;font-style:italic;">${props.caption || 'Figure caption'}</figcaption></figure>`;
        case 'section':
            return `<section ${idAttr} ${classAttr} ${styleAttr}>\n${childHTML}\n</section>`;
        case 'article':
            return `<article ${idAttr} ${classAttr} ${styleAttr}>\n${childHTML}\n</article>`;
        case 'header':
            return `<header ${idAttr} ${classAttr} ${styleAttr}>\n${childHTML}\n</header>`;
        case 'footer':
            return `<footer ${idAttr} ${classAttr} ${styleAttr}>\n${childHTML}\n</footer>`;
        case 'aside':
            return `<aside ${idAttr} ${classAttr} ${styleAttr}>\n${childHTML}\n</aside>`;
        case 'details':
            return `<details ${idAttr} ${classAttr} ${styleAttr}>\n<summary>${props.summary || 'Click to expand'}</summary>\n<div>${props.text || 'Hidden content'}</div>\n</details>`;
        case 'row':
            return `<div ${idAttr} class="flex flex-row ${className || ''}" ${styleAttr}>\n${childHTML}\n</div>`;
        case 'tabs': {
            const tabs = Array.isArray(props.tabs) ? props.tabs : [];
            const headers = tabs.map((t: { label?: string }, i: number) =>
                `<button class="tabs-btn${i === 0 ? ' tabs-btn--active' : ''}">${t.label || `Tab ${i+1}`}</button>`
            ).join('\n');
            return `<div ${idAttr} ${classAttr} ${styleAttr} style="border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;${inlineStyle}">\n<div style="display:flex;border-bottom:1px solid #e2e8f0;background:#f8fafc;">\n${headers}\n</div>\n<div style="padding:16px;font-size:14px;min-height:60px;">${tabs[0]?.content || 'Content'}</div>\n</div>`;
        }
        case 'accordion': {
            const accItems = Array.isArray(props.items) ? props.items : [];
            const accHtml = accItems.map((item: { title?: string; content?: string }, i: number) =>
                `<div style="border-bottom:1px solid #e2e8f0;">\n<button style="width:100%;display:flex;justify-content:space-between;padding:12px 16px;font-size:14px;font-weight:600;color:#1f2937;background:#f8fafc;border:none;cursor:pointer;">${item.title || `Section ${i+1}`}<span style="font-size:18px;">${i === 0 ? '−' : '+'}</span></button>\n${i === 0 ? `<div style="padding:12px 16px;font-size:14px;color:#4b5563;">${item.content || 'Content'}</div>` : ''}\n</div>`
            ).join('\n');
            return `<div ${idAttr} ${classAttr} ${styleAttr} style="border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;${inlineStyle}">\n${accHtml}\n</div>`;
        }
        case 'modal':
            return `<div ${idAttr} ${styleAttr} style="${inlineStyle}">\n<button style="padding:8px 16px;background:#3b82f6;color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer;">${props.buttonText || 'Open Modal'}</button>\n</div>`;
        case 'tooltip':
            return `<div ${idAttr} ${classAttr} ${styleAttr} style="position:relative;display:inline-flex;cursor:pointer;${inlineStyle}">\n<span style="padding:6px 12px;border:1px dashed #d1d5db;border-radius:4px;font-size:14px;">${props.trigger || 'Hover me'}</span>\n<span style="position:absolute;bottom:100%;left:50%;transform:translateX(-50%);margin-bottom:6px;background:#1e293b;color:#fff;padding:6px 10px;border-radius:4px;font-size:12px;white-space:nowrap;">${props.text || 'Tooltip text'}</span>\n</div>`;
        case 'table': {
            const headers = Array.isArray(props.headers) ? props.headers : [];
            const rows = Array.isArray(props.rows) ? props.rows : [];
            const thHtml = headers.map((h: string) => `<th style="background:#f8fafc;font-weight:600;padding:10px 14px;border-bottom:2px solid #e2e8f0;text-align:left;color:#374151;">${h}</th>`).join('\n');
            const rowHtml = rows.map((r: string[]) => `<tr>${r.map((c: string) => `<td style="padding:8px 14px;border-bottom:1px solid #f1f5f9;">${c}</td>`).join('')}</tr>`).join('\n');
            return `<div ${idAttr} ${classAttr} ${styleAttr} style="overflow-x:auto;border:1px solid #e2e8f0;border-radius:6px;${inlineStyle}">\n<table style="width:100%;border-collapse:collapse;font-size:14px;color:#1f2937;">\n${headers.length ? `<thead><tr>\n${thHtml}\n</tr></thead>` : ''}\n<tbody>\n${rowHtml}\n</tbody>\n</table>\n</div>`;
        }
        case 'progress':
            return `<div ${idAttr} ${classAttr} ${styleAttr} style="display:flex;align-items:center;gap:10px;padding:8px 0;${inlineStyle}">\n<div style="flex:1;height:10px;background:#e2e8f0;border-radius:5px;overflow:hidden;">\n<div style="height:100%;width:${Math.min(100, Math.max(0, (props.value||0)/(props.max||100)*100))}%;background:linear-gradient(90deg,#3b82f6,#2563eb);border-radius:5px;"></div>\n</div>\n<span style="font-size:13px;font-weight:600;color:#4b5563;min-width:40px;text-align:right;">${props.label || Math.round((props.value||0)/(props.max||100)*100)+'%'}</span>\n</div>`;
        case 'badge':
            return `<span ${idAttr} ${classAttr} ${styleAttr} style="display:inline-flex;align-items:center;padding:2px 10px;border-radius:999px;font-size:12px;font-weight:600;line-height:1.5;background:#f1f5f9;color:#475569;border:1px solid #e2e8f0;${inlineStyle}">${props.text || 'Badge'}</span>`;
        case 'avatar':
            return `<div ${idAttr} ${classAttr} ${styleAttr} style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;overflow:hidden;background:#e2e8f0;flex-shrink:0;${inlineStyle}">\n${props.src ? `<img src="${props.src}" alt="${props.name || 'Avatar'}" style="width:100%;height:100%;object-fit:cover;" />` : `<span style="font-weight:700;color:#64748b;font-size:16px;line-height:1;">${(props.name||'User').split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0,2) || '?'}</span>`}\n</div>`;
        case 'alert':
            return `<div ${idAttr} ${classAttr} ${styleAttr} style="padding:12px 16px;border-radius:6px;font-size:14px;line-height:1.5;border:1px solid;background:#eff6ff;color:#1e40af;border-color:#bfdbfe;${inlineStyle}">\n<span>${props.text || 'This is an alert message.'}</span>\n</div>`;
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
