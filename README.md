

<h1 align="center">Codasapp</h1>

<p align="center">
  <strong>Modern web application builder with drag-and-drop interface</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/codasapp">
    <img src="https://img.shields.io/npm/v/codasapp" alt="NPM Version">
  </a>
  <a href="https://github.com/alperencolgecen/codasapp/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/codasapp" alt="License">
  </a>
  <a href="https://bundlephobia.com/result?p=codasapp">
    <img src="https://img.shields.io/bundlephobia/minzip/codasapp" alt="Bundle Size">
  </a>
  <a href="https://github.com/alperencolgecen/codasapp/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/alperencolgecen/codasapp/CI.yml" alt="CI Status">
  </a>
</p>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#features">Features</a> •
  <a href="#usage">Usage</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#examples">Examples</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## 📖 About

**Codasapp** is a powerful, modern web application builder that provides an intuitive drag-and-drop interface for creating responsive web applications. Built with React, TypeScript, and Vite, it offers a seamless development experience with real-time visual editing, component management, and instant HTML export capabilities.

Perfect for rapid prototyping, landing pages, admin dashboards, and complete web applications without writing extensive code.

---

## ✨ Features

### 🎨 **Visual Builder**
- **Drag-and-Drop Interface**: Intuitive component placement with pixel-perfect positioning
- **Real-time Preview**: See changes instantly as you build
- **Component Library**: Pre-built components (Container, Text, Button, Image, Row, Column)
- **Smart Grid System**: Automatic alignment and spacing helpers

### 🎯 **Advanced Styling**
- **Multi-State Styling**: Base, Hover, Active, and Focus states for each component
- **CSS Property Editor**: Comprehensive style controls with live preview
- **Responsive Design**: Mobile-first approach with breakpoint management
- **Theme Support**: Customizable color schemes and design tokens

### ⚡ **Developer Experience**
- **TypeScript Support**: Full type safety and IntelliSense
- **Hot Module Replacement**: Instant development feedback
- **Component Tree View**: Hierarchical component management
- **Undo/Redo System**: Full history management with keyboard shortcuts

### 📤 **Export & Deployment**
- **HTML Export**: Generate clean, production-ready HTML files
- **CSS Optimization**: Tailwind CSS utilities with purging
- **Asset Management**: Automatic image and font optimization
- **Multiple Formats**: Export as static files or React components

### 🔧 **Integration**
- **React Ecosystem**: Seamless integration with React components
- **Plugin System**: Extensible architecture for custom components
- **API Integration**: Easy connection to backend services
- **Custom Events**: Comprehensive event handling system

---

## 🚀 Installation

### NPM
```bash
npm install codasapp
```

### Yarn
```bash
yarn add codasapp
```

### PNPM
```bash
pnpm add codasapp
```

---

## 📚 Usage

### Basic Setup

```jsx
import React from 'react';
import { BuilderProvider, CanvasArea, SidebarLeft, InspectorPanel } from 'codasapp';
import 'codasapp/dist/style.css';

function App() {
  return (
    <BuilderProvider>
      <div className="flex h-screen">
        <SidebarLeft />
        <CanvasArea />
        <InspectorPanel />
      </div>
    </BuilderProvider>
  );
}

export default App;
```

### Advanced Configuration

```jsx
import React from 'react';
import { 
  BuilderProvider, 
  CanvasArea, 
  SidebarLeft, 
  InspectorPanel,
  Toolbar 
} from 'codasapp';
import 'codasapp/dist/style.css';

function App() {
  return (
    <BuilderProvider>
      <div className="flex flex-col h-screen">
        <Toolbar />
        <div className="flex flex-1">
          <SidebarLeft />
          <CanvasArea />
          <InspectorPanel />
        </div>
      </div>
    </BuilderProvider>
  );
}

export default App;
```

### Custom Components

```jsx
import React from 'react';
import { useBuilder } from 'codasapp';

const CustomButton = ({ id, ...props }) => {
  const { updateComponent, selectComponent } = useBuilder();
  
  const handleClick = () => {
    selectComponent(id);
  };
  
  const handleChange = (newProps) => {
    updateComponent(id, newProps);
  };
  
  return (
    <button 
      onClick={handleClick}
      onChange={handleChange}
      className="custom-button"
      {...props}
    >
      Custom Button
    </button>
  );
};

export default CustomButton;
```

---

## 🔧 API Reference

### BuilderProvider

The main context provider that manages the builder state.

```tsx
interface BuilderProviderProps {
  children: React.ReactNode;
  initialComponents?: ComponentData[];
  theme?: ThemeConfig;
}
```

### useBuilder Hook

Access the builder state and actions.

```tsx
const {
  components,
  selectedId,
  selectedIds,
  activeStyleState,
  addComponent,
  updateComponent,
  updateComponentStyle,
  selectComponent,
  deleteSelectedComponents,
  undo,
  redo,
  canUndo,
  canRedo
} = useBuilder();
```

### Component Types

```tsx
type ComponentType = 'container' | 'text' | 'button' | 'image' | 'row' | 'column';

interface ComponentData {
  id: string;
  type: ComponentType;
  props: ComponentProps;
  children: ComponentData[];
  parentId?: string | null;
  stateStyles: StateStyles;
}
```

### Style States

```tsx
type StyleState = 'base' | 'hover' | 'active' | 'focus';

interface StateStyles {
  base: ComponentStyle;
  hover: ComponentStyle;
  active: ComponentStyle;
  focus: ComponentStyle;
}
```

---

## 🎯 Examples

### Landing Page Builder

```jsx
import React from 'react';
import { BuilderProvider, CanvasArea } from 'codasapp';

function LandingPageBuilder() {
  return (
    <BuilderProvider>
      <CanvasArea 
        config={{
          width: 1200,
          height: 800,
          backgroundColor: '#ffffff',
          gridEnabled: true
        }}
      />
    </BuilderProvider>
  );
}
```

### Dashboard Builder

```jsx
import React from 'react';
import { 
  BuilderProvider, 
  CanvasArea, 
  SidebarLeft, 
  InspectorPanel 
} from 'codasapp';

function DashboardBuilder() {
  return (
    <BuilderProvider>
      <div className="flex h-screen bg-gray-100">
        <SidebarLeft />
        <CanvasArea />
        <InspectorPanel />
      </div>
    </BuilderProvider>
  );
}
```

### Form Builder

```jsx
import React from 'react';
import { BuilderProvider, CanvasArea } from 'codasapp';

function FormBuilder() {
  return (
    <BuilderProvider
      config={{
        allowedComponents: ['text', 'button', 'container'],
        maxDepth: 3,
        validation: true
      }}
    >
      <CanvasArea />
    </BuilderProvider>
  );
}
```

---

## 🎨 Theming

Codasapp supports extensive theming capabilities:

### Default Theme

```css
:root {
  --primary-color: #7c3aed;
  --secondary-color: #38bdf8;
  --background-color: #0f1115;
  --surface-color: #161920;
  --text-color: #f3f4f6;
  --border-color: #2d323e;
}
```

### Custom Theme

```jsx
import React from 'react';
import { BuilderProvider } from 'codasapp';

const customTheme = {
  colors: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    background: '#1a1a2e',
    surface: '#16213e',
    text: '#ffffff',
    border: '#0f3460'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    lineHeight: '1.5'
  },
  spacing: {
    unit: '8px',
    scale: [0, 4, 8, 16, 24, 32, 48, 64]
  }
};

function ThemedApp() {
  return (
    <BuilderProvider theme={customTheme}>
      <CanvasArea />
    </BuilderProvider>
  );
}
```

---

## 🔌 Plugin System

Create custom components and plugins:

```jsx
import React from 'react';
import { registerComponent } from 'codasapp';

const CustomChart = ({ data, type, ...props }) => {
  return (
    <div className="custom-chart" {...props}>
      {/* Chart implementation */}
    </div>
  );
};

// Register the component
registerComponent('custom-chart', {
  component: CustomChart,
  defaultProps: {
    data: [],
    type: 'line',
    width: 400,
    height: 300
  },
  category: 'Charts',
  icon: 'chart-line'
});
```

---

## 📦 Build & Deployment

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Type checking
npm run type-check
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Build library
npm run build:lib
```

### Deployment

```bash
# Export static files
npm run export

# Deploy to GitHub Pages
npm run deploy:gh-pages

# Deploy to Netlify
npm run deploy:netlify
```

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

---

## 📊 Performance

- **Bundle Size**: Optimized for < 100KB gzipped
- **Tree Shaking**: Full support for unused code elimination
- **Lazy Loading**: Components loaded on-demand
- **Virtual Scrolling**: Efficient handling of large component trees
- **Memory Management**: Automatic cleanup and garbage collection

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork the repository
git clone https://github.com/your-username/codasapp.git

# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
git commit -m 'Add amazing feature'

# Push to the branch
git push origin feature/amazing-feature

# Open a Pull Request
```

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Write tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [DnD Kit](https://dndkit.com/) - Drag and drop library
- [Lucide React](https://lucide.dev/) - Icon library
``
---

<div align="center">
  <strong>Prepared by Alperen Çölgeçen</strong>
</div>
