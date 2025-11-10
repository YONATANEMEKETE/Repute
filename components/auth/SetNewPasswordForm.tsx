import { ArrowLeft, KeySquare } from 'lucide-react';
import React from 'react';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/schema/auth';
import { z } from 'zod';

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const SetNewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    try {
      console.log('Form data:', data);
      // TODO: handle password comfirmation here before procedding
    } catch (error) {
      console.error('Reset password error:', error);
    }
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
            <Button type="submit" className="cursor-pointer">
              Set Password
            </Button>
          </Field>
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
