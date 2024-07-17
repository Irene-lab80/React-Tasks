import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './components';

import './index.css';
import { App } from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorBoundary>,
);
