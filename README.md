# Codasapp

Modern web application builder with drag-and-drop interface.

## Installation

```bash
npm install codasapp
```

## Usage

```jsx
import { BuilderProvider, CanvasArea } from 'codasapp';
import 'codasapp/dist/style.css';

function App() {
  return (
    <BuilderProvider>
      <CanvasArea />
    </BuilderProvider>
  );
}
```

## Features

- 🎨 Drag-and-drop interface
- 📱 Responsive design
- 🎯 Component library
- 🔄 Undo/Redo functionality
- 🎭 Style state management (base, hover, active, focus)
- 📤 Export to HTML

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## Build

```bash
npm run build
```

## License

MIT
