import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const app = document.getElementById('root');

if (!app) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(app);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
