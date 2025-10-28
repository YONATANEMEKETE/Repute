import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import googleIcon from '@/public/google.svg';
import { Separator } from '../ui/separator';
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { Input } from '../ui/input';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const AuthCard = () => {
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
      <form className="w-full">
        <FieldGroup>
          <Field>
            <div className="space-y-2 w-full">
              <Button
                variant={'outline'}
                className="w-full flex items-center gap-x-4 cursor-pointer h-10 text-sm font-semibold shadow-none"
              >
                <Image src={googleIcon} alt="google" width={20} height={20} />
                Continue with Google
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
              required
            />
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

            <Input id="password" type="password" required />
          </Field>
          <Field>
            <Button type="submit" className="cursor-pointer group">
              Login{' '}
              <ArrowRight className="group:hover:translate-x-3 transition-all" />
            </Button>
          </Field>
        </FieldGroup>
      </form>
      {/*  */}
    </div>
  );
};

export default AuthCard;
