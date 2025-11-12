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
};
