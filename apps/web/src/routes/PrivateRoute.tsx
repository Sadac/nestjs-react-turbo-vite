import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';

interface PrivateRouteProps {
  children: JSX.Element;
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectTo = '/login',
}) => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  // Wait until the authentication status is known
  if (isAuthenticated === null) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
    );
  }

  return children;
};

export default PrivateRoute;
