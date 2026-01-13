import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Suppress specific library warnings (React 19 defaultProps and ResizeObserver)
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

const suppressionFilter = (msg: any) => {
  const message = String(msg);
  return (
    message.includes('defaultProps') || 
    message.includes('Support for defaultProps') ||
    message.includes('ResizeObserver loop') ||
    message.includes('componentWillReceiveProps')
  );
};

console.error = (...args) => {
  if (suppressionFilter(args[0])) return;
  originalConsoleError(...args);
};

console.warn = (...args) => {
  if (suppressionFilter(args[0])) return;
  originalConsoleWarn(...args);
};

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Ensure DOM is ready before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
