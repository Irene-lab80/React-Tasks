import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './components';

import './index.css';
import { App } from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import ThemeProvider from './ThemeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ErrorBoundary>
      <React.StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </ErrorBoundary>
  </Provider>,
);
