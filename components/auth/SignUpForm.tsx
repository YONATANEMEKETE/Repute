'use client';

import { Button } from '../ui/button';
import Image from 'next/image';
import googleIcon from '@/public/google.svg';
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { Input } from '../ui/input';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schema/auth';
import { z } from 'zod';
import { useState } from 'react';
import { signUpAction } from '@/actions/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isgoogleloading, setIsGoogleLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    setIsLoading(true);
    console.log('Form data:', data);
    const name = data.name;
    const email = data.email;
    const password = data.password;

    // TODO: handle confirm password too
    const result = await signUpAction({ name, email, password });
    if (!result?.success) {
      setError(result?.message || 'Something went wrong');
      toast.error(result?.message || 'Something went wrong');
    } else {
      toast.success(
        'we have sent a verification email to: ' +
          email +
          '. please check your inbox'
      );
      router.push('/auth/signin');
    }
    setIsLoading(false);
  };

  const handleSignUpWithGoogle = async () => {
    try {
      setIsGoogleLoading(true);
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    } catch (error) {
      console.log(error);
      const e = error as Error;
      toast.error(e.message);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-10 max-w-[400px] w-full">
      <div className="space-y-6 text-center w-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Welcome to{' '}
            <span className="text-myaccent underline decoration-myaccent">
              Repute.
            </span>
          </h2>
          <p className="text-sm text-muted-foreground">
            enter your details to sign up
          </p>
        </div>
      </div>
      {/*  */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <FieldGroup>
          <Field>
            <div className="space-y-2 w-full">
              <Button
                variant={'outline'}
                className="w-full flex items-center gap-x-4 cursor-pointer h-10 text-sm font-semibold shadow-none"
                onClick={handleSignUpWithGoogle}
                disabled={isgoogleloading}
              >
                <Image src={googleIcon} alt="google" width={20} height={20} />
                {isgoogleloading
                  ? 'Signing up with Google...'
                  : 'Sign up with Google'}
                {isgoogleloading && <Loader2 className="animate-spin" />}
              </Button>
            </div>
          </Field>
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            Or continue with
          </FieldSeparator>
          <div className="space-y-3">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                {...register('name')}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="johndoe@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </Field>
          </div>
          <Field>
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer group"
            >
              {isLoading ? 'Registering...' : 'Register'}{' '}
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ArrowRight
                  className={`group:hover:translate-x-3 transition-all`}
                />
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

export default SignUpForm;
