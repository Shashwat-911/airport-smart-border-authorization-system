import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import LoginPage from './pages/LoginPage';
import VerificationPage from './features/verification/VerificationPage';
import TravelerProfilePage from './pages/TravelerProfilePage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/verify" replace />
      },
      {
        path: 'verify',
        element: <VerificationPage />
      },
      {
        path: 'profile',
        element: <TravelerProfilePage />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
