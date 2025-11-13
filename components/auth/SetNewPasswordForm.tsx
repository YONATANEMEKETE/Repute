'use client';

import { ArrowLeft, KeySquare, Loader2 } from 'lucide-react';
import React from 'react';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/schema/auth';
import { z } from 'zod';
import { toast } from 'sonner';
import { resetPasswordAction } from '@/actions/auth';
import { useRouter } from 'next/navigation';

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const SetNewPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    setIsLoading(true);
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
      toast.error('Invalid token');
      return;
    }

    const newPassword = data.password;

    const result = await resetPasswordAction({
      token,
      newPassword,
    });

    if (!result.success) {
      toast.error(result.message || 'Something went wrong');
      setError(result.message || 'Something went wrong');
      return;
    } else {
      toast.success('Password reset successfully');
      router.push('/auth/signin');
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-[400px] w-full flex flex-col items-center gap-y-10">
      <div className="grid place-content-center bg-myaccent/20 size-12 rounded-full">
        <KeySquare className="text-myaccent" />
      </div>
      <div className="text-center">
        <h2 className="text-mysecondary text-lg font-semibold mb-1">
          Set a new password
        </h2>
        <p className="text-mysecondary/70 text-sm font-semibold">
          your new password must be different to your previous passwords
        </p>
      </div>
      {/* form */}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && (
              <p className="text-sm text-destructive mt-1">
                {errors.password.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Enter your password"
              {...register('confirmPassword')}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </Field>
          <Field>
            <Button
              disabled={isLoading}
              type="submit"
              className="cursor-pointer"
            >
              {isLoading ? 'Setting Password...' : 'Set Password'}
              {isLoading && <Loader2 className="animate-spin" />}
            </Button>
          </Field>
          {error && (
            <p className="text-sm text-destructive mt-1 text-center">{error}</p>
          )}
        </FieldGroup>
      </form>
      {/*  */}
      <Link
        href="/auth/signin"
        className="flex items-center gap-x-4 cursor-pointer text-sm font-semibold text-mysecondary/80"
      >
        <ArrowLeft className="size-4" />
        Back to Login
      </Link>
    </div>
  );
};

export default SetNewPasswordForm;
