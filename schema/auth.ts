import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email({
    error: (em) =>
      em.input === undefined ? 'Email is required' : 'Invalid email',
  }),
  password: z.string().min(6, {
    error: (em) =>
      em.input === undefined
        ? 'Password is required'
        : 'Password must be at least 6 characters long',
  }),
});

export const signUpSchema = z
  .object({
    name: z.string().min(3, {
      error: (em) =>
        em.input === undefined
          ? 'Name is required'
          : 'Name must be at least 3 characters long',
    }),
    email: z.email({
      error: (em) =>
        em.input === undefined ? 'Email is required' : 'Invalid email',
    }),
    password: z.string().min(6, {
      error: (em) =>
        em.input === undefined
          ? 'Password is required'
          : 'Password must be at least 6 characters long',
    }),
    confirmPassword: z.string().min(6, {
      error: 'confirm your password first.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.email({
    error: (em) =>
      em.input === undefined ? 'Email is required' : 'Invalid email',
  }),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, {
    error: (em) =>
      em.input === undefined
        ? 'Password is required'
        : 'Password must be at least 6 characters long',
  }),
  confirmPassword: z.string().min(6, {
    error: 'confirm your password first.',
  }),
});
