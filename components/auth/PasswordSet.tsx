import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const PasswordSet = () => {
  return (
    <div className="max-w-[400px] w-full flex flex-col items-center gap-y-10">
      <div className="grid place-content-center bg-myaccent/20 size-12 rounded-full">
        <Check className="text-myaccent" />
      </div>
      <div className="text-center">
        <h2 className="text-mysecondary text-lg font-semibold mb-1">
          Password Reset Successful
        </h2>
        <p className="text-mysecondary/70 text-sm font-semibold">
          Your password has been reset successfully, click below to login
        </p>
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

export default PasswordSet;
