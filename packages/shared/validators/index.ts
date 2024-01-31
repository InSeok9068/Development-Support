import { z } from 'zod';
import type {
  CreateNewsletterInput,
  CreateTodayWorkItemInput,
  NameSuggestionsInput,
  NewslettersInput,
  Source,
  SuggestionsInput,
  UpdateTodayWorkItemForTransferInput,
  UpdateTodayWorkItemInput,
  WorkInput,
  WorksInput,
} from '../types';

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const SourceSchema = z.enum(['GeekNews', 'Yozm']);

export function CreateNewsletterInputSchema(): z.ZodObject<Properties<CreateNewsletterInput>> {
  return z.object({
    originLink: z.string().nullish(),
    source: SourceSchema,
    sourceLink: z.string().nullish(),
    sourceUniqueKey: z.string().nullish(),
    summary: z.string().nullish(),
    title: z.string().min(1),
  });
}

export function CreateTodayWorkItemInputSchema(): z.ZodObject<Properties<CreateTodayWorkItemInput>> {
  return z.object({
    content: z.string().min(1),
    date: z.string().min(1),
    tag: z.string().nullish(),
    time: z.number(),
    title: z.string().min(1),
    uid: z.string().nullish(),
  });
}

export function NameSuggestionsInputSchema(): z.ZodObject<Properties<NameSuggestionsInput>> {
  return z.object({
    crud: z.string().min(1),
    input: z.string().min(1),
    lang: z.string().min(1),
    type: z.string().min(1),
  });
}

export function NewslettersInputSchema(): z.ZodObject<Properties<NewslettersInput>> {
  return z.object({
    source: SourceSchema.nullish(),
  });
}

export function SuggestionsInputSchema(): z.ZodObject<Properties<SuggestionsInput>> {
  return z.object({
    title: z.string().min(1),
    uid: z.string().nullish(),
  });
}

export function UpdateTodayWorkItemForTransferInputSchema(): z.ZodObject<
  Properties<UpdateTodayWorkItemForTransferInput>
> {
  return z.object({
    id: z.string().min(1),
    itemId: z.string().min(1),
  });
}

export function UpdateTodayWorkItemInputSchema(): z.ZodObject<Properties<UpdateTodayWorkItemInput>> {
  return z.object({
    content: z.string().min(1),
    itemId: z.string().min(1),
    tag: z.string().nullish(),
    time: z.number(),
    title: z.string().min(1),
  });
}

export function WorkInputSchema(): z.ZodObject<Properties<WorkInput>> {
  return z.object({
    itemId: z.string().min(1),
    uid: z.string().nullish(),
  });
}

export function WorksInputSchema(): z.ZodObject<Properties<WorksInput>> {
  return z.object({
    endDate: z.string().min(1),
    startDate: z.string().min(1),
    uid: z.string().nullish(),
  });
}
