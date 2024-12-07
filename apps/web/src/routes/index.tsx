import LoginPage from '@/pages/Auth/LoginPage';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import RegisterPage from '@/pages/Auth/RegisterPage';
import NotFound from '@/pages/NotFound';

export default function () {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
