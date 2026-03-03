import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/design.css'
import './i18n';
import App from './App.tsx'
import { createRootComponent } from './utils/component-factory';

// Verification: Log the root component structure
console.log('Root Component Structure:', createRootComponent());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
