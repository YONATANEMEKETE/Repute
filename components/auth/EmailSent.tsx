import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const EmailSent = () => {
  return (
    <div className="max-w-[400px] w-full flex flex-col items-center gap-y-10">
      <div className="grid place-content-center bg-myaccent/20 size-12 rounded-full">
        <Mail className="text-myaccent" />
      </div>
      <div className="text-center">
        <h2 className="text-mysecondary text-lg font-semibold mb-1">
          Check Your Email
        </h2>
        <p className="text-mysecondary/70 text-sm font-semibold">
          We have sent a Password reset link to johndoe@example.com
        </p>
        <div className="text-sm text-mysecondary/70 mt-4">
          Didn't recieve the email{' '}
          <span className="font-medium hover:underline cursor-pointer text-mysecondary">
            click to resend.
          </span>
        </div>
      </div>
      <Link
        href="/auth/signin"
        className="flex items-center gap-x-2 cursor-pointer text-sm font-semibold text-mysecondary/80"
      >
        <ArrowLeft className="size-4" />
        Back to Login
      </Link>
    </div>
  );
};

export default EmailSent;
