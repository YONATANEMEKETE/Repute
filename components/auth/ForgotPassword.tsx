'use client';

import { useState } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import EmailSent from './EmailSent';

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const handleSendEmail = (email: string) => {
    console.log(email);
    const timer = setTimeout(() => {
      setEmailSent(true);
    }, 2000);

    return () => clearTimeout(timer);
  };

  return (
    <div className="w-full max-w-[400px]">
      {emailSent ? (
        <EmailSent />
      ) : (
        <ForgotPasswordForm onSubmitForm={handleSendEmail} />
      )}
    </div>
  );
};

export default ForgotPassword;
