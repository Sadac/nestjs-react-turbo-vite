'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, LockIcon } from 'lucide-react';
import { t } from 'i18next';

const registerSchema = z
  .object({
    email: z.string().email({ message: t('register.form.email.invalid') }),
    confirmEmail: z
      .string()
      .email({ message: t('register.form.confirmEmail.error') }),
    password: z
      .string()
      .min(6, { message: t('register.form.password.invalid') }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: t('register.form.confirmEmail.error'),
    path: ['confirmEmail'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

interface LoginFormProps {
  onSubmit: (data: RegisterFormData) => void;
  className?: string;
  disabled?: boolean;
}

export function RegisterForm({
  onSubmit,
  className,
  disabled,
}: LoginFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmitForm = (data: RegisterFormData) => onSubmit(data);

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
              id="confirm-email"
              type="text"
              placeholder="Confirm your email"
              className="pl-10"
              {...register('confirmEmail')}
            />
            <span className="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Mail className="size-5 text-muted-foreground" />
            </span>
          </div>

          {errors.confirmEmail && (
            <p className="text-sm text-red-500" role="alert">
              {errors.confirmEmail.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="relative w-full items-center">
            <Input
              id="password"
              type="password"
              placeholder={t('register.form.password.placeholder')}
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
          {disabled ? t('register.button.loading') : t('register.button.title')}
        </Button>
      </form>

      <p className="mt-4 text-center">{t('register.cta.pre')}</p>

      <p className="text-center">
        <Link className="text-blue-500" to="/login">
          {t('register.cta.action')}
        </Link>
      </p>
    </div>
  );
}
