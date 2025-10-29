import { ArrowLeft, KeySquare } from 'lucide-react';
import React from 'react';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/app/schema/auth';
import { z } from 'zod';

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface Props {
  onSubmitForm: (email: string) => void;
}

const ForgotPasswordForm = ({ onSubmitForm }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      console.log('Form data:', data);
      onSubmitForm(data.email);
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  return (
    <div className="max-w-[400px] w-full flex flex-col items-center gap-y-10">
      <div className="grid place-content-center bg-myaccent/20 size-12 rounded-full">
        <KeySquare className="text-myaccent" />
      </div>
      <div className="text-center">
        <h2 className="text-mysecondary text-lg font-semibold mb-1">
          Forgot Password?
        </h2>
        <p className="text-mysecondary/70 text-sm font-semibold">
          Don't worry we will send you a reset instruction
        </p>
      </div>
      {/* form */}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              required
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </Field>
          <Field>
            <Button type="submit" className="cursor-pointer">
              Send
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

export default ForgotPasswordForm;
