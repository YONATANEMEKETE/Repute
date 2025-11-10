'use client';
import PasswordSet from './PasswordSet';
import SetNewPasswordForm from './SetNewPasswordForm';
import { useState } from 'react';

const SetNewPassword = () => {
  const [passwordSet] = useState<boolean>(false);

  return (
    <div className="w-full max-w-[400px]">
      {passwordSet ? <PasswordSet /> : <SetNewPasswordForm />}
    </div>
  );
};

export default SetNewPassword;
