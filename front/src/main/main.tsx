import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; 
import Repository from './Components/repository';
import Layout from './Components/Layout';
import NotFound from './Components/notFound';
import Home from './Components/Home';
import BookTable from './Components/BookTable';
import AddBook from './Components/AddBook';
import EditBook from './Components/EditBook';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute'; 
import Signup from './Components/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'repository',
        element: <Repository />,
      },
      {
        path: 'BTable',
        element: <BookTable />,
      },
      {
        path: 'AddBook',
        element: (
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        ),
      },
      {
        path: 'EditBook', 
        element: (
          <ProtectedRoute>
            <EditBook />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
