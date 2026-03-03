import { createPortal } from 'react-dom';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useApp } from './hooks/useApp';
import { CanvasArea } from './components/CanvasArea';
import { Toolbar } from './components/Toolbar';
import { InspectorPanel } from './components/InspectorPanel';
import { SidebarLeft } from './components/SidebarLeft';
import { DragPreview } from './components/DragPreview';
import { BuilderProvider } from './context/BuilderContext';
import './styles/App.css';

const BuilderLayout = () => {
  const {
    components,
    activeItem,
    sensors,
    handleDragStart,
    handleDragEnd,
  } = useApp();

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      {/* 
        Functional Injectors:
        These components mount themselves into index.html portals.
      */}
      <Toolbar />
      <SidebarLeft />
      <CanvasArea components={components} />
      <InspectorPanel />

      {/* Technical Fixes: Instant Drop & Ghost Pixel Fix */}
      {activeItem && createPortal(
        <DragOverlay dropAnimation={null}>
          <DragPreview type={activeItem.type} />
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

const App = () => (
  <BuilderProvider>
    <BuilderLayout />
  </BuilderProvider>
);

export default App;