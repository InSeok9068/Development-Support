export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type CreateTodayWorkInput = {
  content: Scalars['String']['input'];
  tag?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type DeleteTodayWorkInput = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodayWork: Scalars['Boolean']['output'];
  deleteTodayWork: Scalars['Boolean']['output'];
};

export type MutationCreateTodayWorkArgs = {
  input: CreateTodayWorkInput;
};

export type MutationDeleteTodayWorkArgs = {
  input: DeleteTodayWorkInput;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  works?: Maybe<Array<Maybe<Work>>>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Work = {
  __typename?: 'Work';
  id: Scalars['ID']['output'];
  tag?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  workItems?: Maybe<Array<Maybe<WorkItem>>>;
};

export type WorkItem = {
  __typename?: 'WorkItem';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};
