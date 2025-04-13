import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

export type LoginInput = z.infer<typeof loginSchema>;

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.number(),
    email: z.string().email()
    // Include only fields that should be visible to the client
  })
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
