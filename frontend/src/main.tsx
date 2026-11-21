import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './main-app-layout/App';
import './styles/variables.css';
import './styles/base.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root is missing in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
