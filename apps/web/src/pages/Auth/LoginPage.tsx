import { LoginForm, LoginFormData } from '@/components/feature/auth/login-form';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import apiAdapter from '@/services/adapters/axios-api-adapter';

export default function LoginPage() {
  const navigate = useNavigate();
  const { authenticate } = useAuthContext();
  const { t } = useTranslation();
  const { login } = apiAdapter;

  const {
    mutate: loginMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (!res.success) return;

      authenticate();

      navigate('/dashboard');
    },
  });

  const handleLogin = (data: LoginFormData) => loginMutation(data);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {t('login.form.title')}
        </h2>

        {isError && (
          <div className="text-red-500 text-center">
            {t('login.form.error')}
          </div>
        )}

        <LoginForm
          className="mt-8"
          onSubmit={handleLogin}
          disabled={isPending}
        />
      </div>
    </div>
  );
}
