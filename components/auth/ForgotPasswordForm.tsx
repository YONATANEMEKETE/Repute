import { ArrowLeft, KeySquare } from 'lucide-react';
import React from 'react';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';

interface Props {
  onSubmit: (email: string) => void;
}

const ForgotPasswordForm = ({ onSubmit }: Props) => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email);
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
      <form className="w-full" onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
