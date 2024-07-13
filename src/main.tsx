import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary, MainLayout } from './components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage, SearchPage } from './pages/index.ts';
import ContextProvider from './provider';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: '/:page',
        element: <SearchPage />,
      },
      {
        path: '/person/:contactId',
        element: <div>person</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <React.StrictMode>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </React.StrictMode>
  </ErrorBoundary>,
);
