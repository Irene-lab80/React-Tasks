import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage, SearchPage } from './pages/index.ts';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/:page',
        element: <SearchPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },

  {
    path: '/person/:contactId',
    element: <div>person</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ErrorBoundary>,
);
