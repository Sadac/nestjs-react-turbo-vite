import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import apiAdapter from '@/services/adapters/axios-api-adapter';
import {
  RegisterForm,
  RegisterFormData,
} from '@/components/feature/auth/register-form';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { authenticate } = useAuthContext();
  const { t } = useTranslation();

  const {
    mutate: registerMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: apiAdapter.register,
    onSuccess: () => {
      // Authenticate the user after registration & toast success. Redirect to login.
      authenticate();

      navigate('/login', { replace: true });
    },
  });

  const handleRegister = (data: RegisterFormData) => registerMutation(data);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {t('register.form.title')}
        </h2>

        {isError && (
          <div className="text-red-500 text-center">
            {t('register.form.error')}{' '}
            {error &&
              'status' in error &&
              (error as { status: number }).status === 409 &&
              t('register.form.conflict')}
          </div>
        )}

        <RegisterForm
          className="mt-8"
          onSubmit={handleRegister}
          disabled={isPending}
        />
      </div>
    </div>
  );
}
