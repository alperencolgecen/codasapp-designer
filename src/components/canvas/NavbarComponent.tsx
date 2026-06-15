import type { CanvasComponentDefinition } from './types';
import '../../styles/components/NavbarComponent.css';

export const NavbarComponent: CanvasComponentDefinition = {
    defaultProps: {
        brand: 'Brand',
        links: [
            { label: 'Home', href: '#' },
            { label: 'About', href: '#' },
            { label: 'Contact', href: '#' },
        ],
    },
    render: (props) => {
        const links: { label: string; href: string }[] = Array.isArray(props.links) ? props.links : [];
        return (
            <nav className="canvas-cmp-navbar">
                <span className="canvas-cmp-navbar__brand">{props.brand || 'Brand'}</span>
                <div className="canvas-cmp-navbar__links">
                    {links.map((link, i) => (
                        <a key={i} className="canvas-cmp-navbar__link" href={link.href || '#'}>
                            {link.label || 'Link'}
                        </a>
                    ))}
                </div>
            </nav>
        );
    },
};
