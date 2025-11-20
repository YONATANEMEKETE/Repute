import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from './generated/prisma/client';
import { nextCookies } from 'better-auth/next-js';
import { Resend } from 'resend';
import VerifyEmail from '@/components/email/VerifyEmail';
import ForgotPasswordEmail from '@/components/email/ForgotPasswordEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();
export const auth = betterAuth({
  appName: 'Repute',
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: `Acme <onboarding@resend.dev>`,
        to: user.email,
        subject: 'Reset your password - Action required',
        react: ForgotPasswordEmail({
          username: user.name,
          resetUrl: url,
          userEmail: user.email,
        }),
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: `Acme <onboarding@resend.dev>`,
        to: user.email,
        subject: 'Verfify your Email',
        react: VerifyEmail({ username: user.name, verifyUrl: url }),
      });
    },
    sendOnSignUp: true,
    sendOnSignIn: true,
    expiresIn: 3600 * 24,
    autoSignInAfterVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: 'select_account',
    },
  },
  plugins: [nextCookies()],
});
