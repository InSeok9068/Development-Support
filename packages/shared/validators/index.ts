import { z } from 'zod';

export const CreateTodayWorkItemInputValidator = z.object({
  content: z.string().min(1),
  tag: z.string().optional(),
  title: z.string().min(1),
  time: z.number().min(1).max(8),
});
