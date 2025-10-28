import AuthCard from '@/components/auth/auth-card';
import { ValueCarousel } from '@/components/auth/value-carousel';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <main className="bg-mysecondary p-2 w-screen h-screen flex justify-between gap-x-3">
      <div className="relative overflow-clip basis-[40%] bg-mysecondary-lighter rounded-2xl shadow-lg flex flex-col justify-end p-2">
        <div className="absolute top-0 right-0 w-[1400px] h-[1400px] pointer-events-none -translate-y-1/2 translate-x-1/2  rounded-full">
          {/* change the bg to radiel gradient for the div below*/}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2000px] h-[2000px] bg-radial from-myaccent via-transparent to-transparent rounded-full blur-xl opacity-25"></div>
        </div>
        {/*  */}
        <div className="w-full h-[400px]  border-myprimary-gray rounded-2xl flex flex-col items-center gap-y-10">
          {/* have a ring arround the image with some offset space */}
          <div className="rounded-xl ring-1 ring-myprimary ring-offset-2 ring-offset-mysecondary">
            <Image
              src="/main-logo-rounded.png"
              alt="logo"
              width={80}
              height={80}
            />
          </div>
          {/*  */}
          <ValueCarousel />
        </div>
      </div>
      {/* right side */}
      <div className="basis-[60%] bg-myprimary rounded-2xl shadow-lg px-6 py-4 flex flex-col justify-between items-center">
        <div className="w-full flex items-center justify-between">
          <Image src="/main-logo.png" alt="logo" width={30} height={30} />
          {/*  */}
          <div className="flex items-center gap-x-1 text-mysecondary font-medium text-sm">
            <div>Don't have an account?</div>
            <Link href="/auth/signup" className="font-semibold underline">
              Sign up
            </Link>
          </div>
        </div>
        {/*  */}
        <AuthCard />
        {/*  */}
        <div className="w-full text-center">
          <p className="text-muted-foreground text-sm font-medium">
            2025 Repute. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
