import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ForgotPassword from '@/components/auth/ForgotPassword';

const page = () => {
  return (
    <div className="basis-[60%] bg-myprimary rounded-2xl shadow-lg px-6 py-4 flex flex-col justify-between items-center">
      <div className="w-full flex items-center justify-between">
        <Image src="/main-logo.png" alt="logo" width={30} height={30} />
        {/*  */}
        <div className="flex items-center gap-x-1 text-mysecondary font-medium text-sm">
          <Link href="/auth/signin" className="font-semibold ">
            Sign in
          </Link>
        </div>
      </div>
      {/*  */}
      <ForgotPassword />
      {/*  */}
      <div className="w-full text-center">
        <p className="text-muted-foreground text-sm font-medium">
          2025 Repute. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default page;
