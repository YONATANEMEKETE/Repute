'use client';

import { useState } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import EmailSent from './EmailSent';
import { sendResetPasswordemail } from '@/actions/auth';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  const handleSendEmail = async (email: string) => {
    setIsLoading(true);
    setEmail(email);
    const result = await sendResetPasswordemail(email);
    if (result.success) {
      setEmailSent(true);
      toast.success('we have sent a reset password email to: ' + email);
    } else {
      toast.error(result.message || 'Something went wrong!');
      setError(result.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-[400px]">
      {emailSent ? (
        <EmailSent email={email} onResend={handleSendEmail} />
      ) : (
        <ForgotPasswordForm
          onSubmitForm={handleSendEmail}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
