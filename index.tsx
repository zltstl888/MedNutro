import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Suppress specific library warnings that are harmless but annoying in development
const originalConsoleError = console.error;
console.error = (...args) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  // Suppress defaultProps warnings (React 19) and ResizeObserver loop (common in charts)
  if (
    msg.includes('defaultProps') || 
    msg.includes('Support for defaultProps') ||
    msg.includes('ResizeObserver loop')
  ) {
    return;
  }
  originalConsoleError(...args);
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
