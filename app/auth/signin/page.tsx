import AuthCard from '@/components/auth/auth-card';
import { auth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/dashboard');
  }

  return (
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
  );
};

export default page;
