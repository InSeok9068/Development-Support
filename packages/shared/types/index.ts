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

export type CreateTodayWorkItemInput = {
  content: Scalars['String']['input'];
  date: Scalars['String']['input'];
  tag?: InputMaybe<Scalars['String']['input']>;
  time: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodayWorkItem: Work;
  deleteTodayWork: Work;
  deleteTodayWorkItem: WorkItem;
  sendWeeklyReport: Scalars['Boolean']['output'];
  updateTodayWorkItemForTransfer: Work;
};

export type MutationCreateTodayWorkItemArgs = {
  input: CreateTodayWorkItemInput;
};

export type MutationDeleteTodayWorkArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteTodayWorkItemArgs = {
  id: Scalars['ID']['input'];
};

export type MutationUpdateTodayWorkItemForTransferArgs = {
  input: UpdateTodayWorkItemForTransferInput;
};

export type Query = {
  __typename?: 'Query';
  suggestions?: Maybe<Array<Maybe<Work>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  work?: Maybe<Work>;
  works?: Maybe<Array<Maybe<Work>>>;
};

export type QuerySuggestionsArgs = {
  title: Scalars['String']['input'];
};

export type QueryWorkArgs = {
  id: Scalars['ID']['input'];
};

export type QueryWorksArgs = {
  date: Scalars['String']['input'];
};

export type UpdateTodayWorkItemForTransferInput = {
  id: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
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
  time: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  workItems?: Maybe<Array<Maybe<WorkItem>>>;
};

export type WorkItem = {
  __typename?: 'WorkItem';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  time: Scalars['Int']['output'];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = { __typename?: 'Query'; user?: { __typename?: 'User'; username: string } | null };

export type WorksQueryVariables = Exact<{
  date: Scalars['String']['input'];
}>;

export type WorksQuery = {
  __typename?: 'Query';
  works?: Array<{
    __typename?: 'Work';
    id: string;
    title: string;
    time: number;
    workItems?: Array<{ __typename?: 'WorkItem'; id: string; content: string; time: number } | null> | null;
  } | null> | null;
};

export type CreateTodayWorkItemMutationVariables = Exact<{
  input: CreateTodayWorkItemInput;
}>;

export type CreateTodayWorkItemMutation = {
  __typename?: 'Mutation';
  createTodayWorkItem: { __typename?: 'Work'; id: string };
};

export type UpdateTodayWorkItemForTransferMutationVariables = Exact<{
  input: UpdateTodayWorkItemForTransferInput;
}>;

export type UpdateTodayWorkItemForTransferMutation = {
  __typename?: 'Mutation';
  updateTodayWorkItemForTransfer: { __typename?: 'Work'; id: string };
};

export type DeleteTodayWorkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteTodayWorkMutation = { __typename?: 'Mutation'; deleteTodayWork: { __typename?: 'Work'; id: string } };

export type DeleteTodayWorkItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteTodayWorkItemMutation = {
  __typename?: 'Mutation';
  deleteTodayWorkItem: { __typename?: 'WorkItem'; id: string };
};

export type SendWeeklyReportMutationVariables = Exact<{ [key: string]: never }>;

export type SendWeeklyReportMutation = { __typename?: 'Mutation'; sendWeeklyReport: boolean };

export type SuggestionsQueryVariables = Exact<{
  title: Scalars['String']['input'];
}>;

export type SuggestionsQuery = {
  __typename?: 'Query';
  suggestions?: Array<{ __typename?: 'Work'; title: string } | null> | null;
};
