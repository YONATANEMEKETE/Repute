'use client';
import PasswordSet from './PasswordSet';
import SetNewPasswordForm from './SetNewPasswordForm';
import { useState } from 'react';

const SetNewPassword = () => {
  const [passwordSet, setPasswordSet] = useState<boolean>(true);

  return (
    <div className="w-full max-w-[400px]">
      {passwordSet ? <PasswordSet /> : <SetNewPasswordForm />}
    </div>
  );
};

export default SetNewPassword;
