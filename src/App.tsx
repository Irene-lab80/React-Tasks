import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DetailsCard, Error } from './components';
import { SearchPage } from './pages';

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
  return <RouterProvider router={router} />;
};
