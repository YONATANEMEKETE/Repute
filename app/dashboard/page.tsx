'use client';

import { signOutAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutAction();
  };

  return (
    <div className="h-screen grid place-content-center">
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default page;
