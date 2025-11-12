'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import googleIcon from '@/public/google.svg';
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { Input } from '../ui/input';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/schema/auth';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { signInAction } from '@/actions/auth';
import { toast } from 'sonner';

type SignInFormData = z.infer<typeof signInSchema>;

const AuthCard = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    setIsLoading(true);
    const email = data.email;
    const password = data.password;

    const result = await signInAction({ email, password });
    if (!result.success) {
      setError(result.message || 'something went wrong!');
      toast.error(result.message || 'something went wrong!');
    } else {
      toast.success('Signin Successful');
      router.push('/dashboard');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-y-10 max-w-[400px] w-full">
      <div className="space-y-6 text-center w-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Welcome back to{' '}
            <span className="text-myaccent underline decoration-myaccent">
              Repute.
            </span>
          </h2>
          <p className="text-sm text-muted-foreground">
            please enter your details to log in
          </p>
        </div>
      </div>
      {/*  */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <FieldGroup>
          <Field>
            <div className="space-y-2 w-full">
              <Button
                type="button"
                variant={'outline'}
                className="w-full flex items-center gap-x-4 cursor-pointer h-10 text-sm font-semibold shadow-none"
              >
                <Image src={googleIcon} alt="google" width={20} height={20} />
                Sign in with Google
              </Button>
            </div>
          </Field>
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            Or continue with
          </FieldSeparator>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
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
            {/* add a seen icon for the password field */}
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="/auth/forgot-password"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <Input
              id="password"
              type="password"
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
            <Button
              type="submit"
              className="cursor-pointer group"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login'}{' '}
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ArrowRight className="group:hover:translate-x-3 transition-all" />
              )}
            </Button>
          </Field>
          {error && (
            <p className="text-sm text-destructive mt-1 text-center">{error}</p>
          )}
        </FieldGroup>
      </form>
      {/*  */}
    </div>
  );
};

export default AuthCard;
