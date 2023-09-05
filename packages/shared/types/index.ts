import { z } from 'zod';

export const User = z.object({
  id: z.number(),
  userId: z.string(),
  password: z.string(),
  username: z.string(),
  email: z.string().email(),
});
