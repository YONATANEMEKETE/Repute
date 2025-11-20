'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signInAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: '/dashboard',
      },
    });
    return { success: true, message: 'sign in successful' };
  } catch (error) {
    console.log(error);
    const e = error as Error;
    return { success: false, message: e.message };
  }
};

export const signInWithGoogle = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    await auth.api.signInSocial({
      body: {
        provider: 'google',
      },
    });
    return { success: true, message: 'sign in with google successful' };
  } catch (error) {
    console.log(error);
    const e = error as Error;
    return { success: false, message: e.message };
  }
};

export const signUpAction = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<{ success: boolean; message: string }> => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        callbackURL: `${baseUrl}/dashboard`,
      },
    });
    return { success: true, message: 'sign up successful' };
  } catch (error) {
    console.log(error);
    const e = error as Error;
    return { success: false, message: e.message };
  }
};

export const signOutAction = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.log(error);
  }
  redirect('/auth/signin');
};

export const sendResetPasswordemail = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await auth.api.requestPasswordReset({
      body: {
        email: email,
        redirectTo: '/auth/set-password',
      },
    });
    return { success: true, message: 'reset password email sent' };
  } catch (error) {
    console.log(error);
    const e = error as Error;
    return { success: false, message: e.message };
  }
};

export const resetPasswordAction = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    await auth.api.resetPassword({
      body: {
        newPassword: newPassword,
        token: token,
      },
    });
    return { success: true, message: 'password reset successful' };
  } catch (error) {
    console.log(error);
    const e = error as Error;
    return { success: false, message: e.message };
  }
};
