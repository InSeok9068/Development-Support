import { z } from 'zod';
import type {
  CreateNewsletterInput,
  CreateTodayWorkItemInput,
  MenuPermissionInput,
  MenusInput,
  NameSuggestionsCrud,
  NameSuggestionsInput,
  NameSuggestionsLang,
  NameSuggestionsType,
  NewslettersInput,
  Role,
  SampleType,
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

export const NameSuggestionsCrudSchema = z.enum(['CREATE', 'DELETE', 'READ', 'UPDATE']);

export const NameSuggestionsLangSchema = z.enum(['JAVA', 'JAVA_SCRIPT', 'TYPE_SCRIPT']);

export const NameSuggestionsTypeSchema = z.enum(['CLASS', 'METHOD', 'URL', 'VARIABLE']);

export const RoleSchema = z.enum(['ADMIN', 'GUEST', 'USER']);

export const SourceSchema = z.enum(['GEEK_NEWS', 'YOZM']);

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
    date: z.date(),
    tag: z.string().nullish(),
    time: z.number(),
    title: z.string().min(1),
    uid: z.string().nullish(),
  });
}

export function MenuPermissionInputSchema(): z.ZodObject<Properties<MenuPermissionInput>> {
  return z.object({
    to: z.string().min(1),
    uid: z.string().nullish(),
  });
}

export function MenusInputSchema(): z.ZodObject<Properties<MenusInput>> {
  return z.object({
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

export function SampleTypeSchema(): z.ZodObject<Properties<SampleType>> {
  return z.object({
    email: z.string().email().min(1),
    number1: z.number().min(1).max(5),
    number2: z.number().lt(1).gt(5),
    url: z.string().url().min(1),
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
    endDate: z.date(),
    startDate: z.date(),
    uid: z.string().nullish(),
  });
}
