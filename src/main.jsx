import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { LanguageProvider } from './LanguageContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
      <ToastContainer autoClose={1000} position="top-center" />
    </LanguageProvider>
  </StrictMode>
);