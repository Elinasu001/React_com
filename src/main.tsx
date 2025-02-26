import App from '@src/App';
import '@src/assets/styles/css/index.css';
import '@src/assets/styles/scss/global.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
