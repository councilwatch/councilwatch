import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import { router } from './router.tsx';
import { theme } from './theme.ts';

const app = document.getElementById('root');

if (!app) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(app);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
