'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import * as z from 'zod';
import { Mail, LockIcon } from 'lucide-react';
import { t } from 'i18next';

const loginSchema = z.object({
  email: z.string().email({ message: t('login.form.email.invalid') }),
  password: z
    .string()
    .min(6, { message: t('login.form.password.invalid', { minLength: 6 }) }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void;
  className?: string;
  disabled?: boolean;
};

export function LoginForm({ onSubmit, className, disabled }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitForm = (data: LoginFormData) => onSubmit(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className={cn('space-y-6', className)}
      >
        <div className="space-y-2">
          <div className="relative w-full items-center">
            <Input
              id="email"
              type="text"
              placeholder="email@example.com"
              className="pl-10"
              {...register('email')}
            />
            <span className="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Mail className="size-5 text-muted-foreground" />
            </span>
          </div>

          {errors.email && (
            <p className="text-sm text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="relative w-full items-center">
            <Input
              id="password"
              type="password"
              placeholder={t('login.form.password.placeholder')}
              className="pl-10"
              {...register('password')}
            />
            <span className="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <LockIcon className="size-5 text-muted-foreground" />
            </span>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={disabled}>
          {disabled ? t('login.button.loading') : t('login.button.title')}
        </Button>
      </form>

      <p className="mt-4 text-center">{t('login.cta.pre')}</p>

      <p className="text-center">
        <Link className="text-blue-500" to="/register">
          {t('login.cta.action')}
        </Link>
      </p>
    </div>
  );
}
