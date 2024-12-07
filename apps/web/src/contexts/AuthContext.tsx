import { Spinner } from '@/components/ui/spinner';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiAdapter from '@/services/adapters/axios-api-adapter';
import { useMutation } from '@tanstack/react-query';

type AuthContextType = {
  isAuthenticated: boolean | null;
  authenticate: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicRoutes = ['/login', '/register'];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { status, logout: _logout } = apiAdapter;

  const { mutateAsync: checkStatusMutation, isPending: checkStatusIsLoading } =
    useMutation({
      mutationFn: status,
    });

  const { mutateAsync: logoutMutation, isPending: logoutIsLoading } =
    useMutation({
      mutationFn: _logout,
    });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { authenticated } = await checkStatusMutation();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        if (publicRoutes.includes(location.pathname)) {
          navigate('/');
        }
      } else if (!publicRoutes.includes(location.pathname)) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error checking authentication status');
      setIsAuthenticated(false);

      if (!publicRoutes.includes(location.pathname)) {
        navigate('/login');
      }
    }
  };

  const authenticate = () => {
    setIsAuthenticated(true);

    navigate('/');
  };

  const logout = async () => {
    try {
      await logoutMutation();
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout');
    }
  };

  if (checkStatusIsLoading || logoutIsLoading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};
