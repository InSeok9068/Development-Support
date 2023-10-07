import { z } from 'zod';

export const CreateTodayWorkItemInputValidator = z.object({
  content: z.string().nonempty(),
  tag: z.string().optional(),
  title: z.string().nonempty(),
  time: z.number().min(1).max(8),
});
