import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DetailsCard, Error, ErrorBoundary } from './components';
import { SearchPage } from './pages';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ThemeProvider from './ThemeProvider';
import React from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DetailsCard />,
    errorElement: <Error />,
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

export const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <React.StrictMode>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </React.StrictMode>
      </ErrorBoundary>
    </Provider>
  );
};
