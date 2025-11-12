import { signOutAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div className="h-screen grid place-content-center">
      <Button onClick={signOutAction}>Sign Out</Button>
    </div>
  );
};

export default page;
