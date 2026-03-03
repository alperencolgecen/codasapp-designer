import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IframeRendererProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const IframeRenderer: React.FC<IframeRendererProps> = ({ children, className, style }) => {
    const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
    const mountNode = contentRef?.contentWindow?.document?.body;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!contentRef?.contentWindow) return;

        const iframeDoc = contentRef.contentWindow.document;

        const copyStyles = () => {
            const head = iframeDoc.head;

            // Clean head first
            head.innerHTML = '';

            // 1. Inject design.css (by finding the link tag in the main document)
            // We assume main document has <link rel="stylesheet" href="..."> for design.css
            // Or we check if it is imported via Vite CSS injection.

            // For Vite dev mode, styles are often in <style> tags or linked blob/local urls.
            // We'll iterate all stylesheets and copy them.

            // Copy <link rel="stylesheet">
            Array.from(document.querySelectorAll('link[rel="stylesheet"]')).forEach((link) => {
                const newLink = iframeDoc.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = (link as HTMLLinkElement).href;
                head.appendChild(newLink);
            });

            // Copy <style> tags (Vite injects CSS here in dev)
            Array.from(document.querySelectorAll('style')).forEach((style) => {
                const newStyle = iframeDoc.createElement('style');
                newStyle.innerHTML = style.innerHTML;
                head.appendChild(newStyle);
            });

            // Add Google Fonts Quicksand manually to ensure it's there if not caught above
            const fontLink = iframeDoc.createElement('link');
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap';
            fontLink.rel = 'stylesheet';
            head.appendChild(fontLink);

            // Set body background to transparent so it blends or we can control it
            iframeDoc.body.style.backgroundColor = 'transparent';
            iframeDoc.body.style.margin = '0';
        };

        copyStyles();

        // Observer to watch for new styles added to the main document (e.g. by Vite HMR)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeName === 'STYLE' || (node.nodeName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet')) {
                        const newNode = node.cloneNode(true);
                        iframeDoc.head.appendChild(newNode);
                    }
                });
            });
        });

        observer.observe(document.head, { childList: true });

        setLoaded(true);

        return () => observer.disconnect();
    }, [contentRef]);

    return (
        <iframe
            ref={setContentRef}
            className={className}
            style={style}
            title="Isolated Renderer"
        >
            {mountNode && loaded && createPortal(children, mountNode)}
        </iframe>
    );
};
