'use client';

import { Button } from '../ui/button';
import Image from 'next/image';
import googleIcon from '@/public/google.svg';
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { Input } from '../ui/input';
import { ArrowRight } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schema/auth';
import { z } from 'zod';

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      console.log('Form data:', data);
      // TODO: handle confirm password too
    } catch (error) {
      console.error('Sign up error:', error);
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
              >
                <Image src={googleIcon} alt="google" width={20} height={20} />
                Sign up with Google
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
                required
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
                required
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                {...register('password')}
                required
              />
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
                required
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </Field>
          </div>
          <Field>
            <Button type="submit" className="cursor-pointer group">
              Sign up{' '}
              <ArrowRight className="group:hover:translate-x-3 transition-all" />
            </Button>
          </Field>
        </FieldGroup>
      </form>
      {/*  */}
    </div>
  );
};

export default SignUpForm;
