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
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodayWorkItem: Work;
  deleteTodayWorkItem: WorkItem;
  sendWeeklyReport: Scalars['Boolean']['output'];
  updateTodayWorkItem: Work;
  updateTodayWorkItemForTransfer: Work;
};

export type MutationCreateTodayWorkItemArgs = {
  input: CreateTodayWorkItemInput;
};

export type MutationDeleteTodayWorkItemArgs = {
  itemId: Scalars['ID']['input'];
};

export type MutationUpdateTodayWorkItemArgs = {
  input: UpdateTodayWorkItemInput;
};

export type MutationUpdateTodayWorkItemForTransferArgs = {
  input: UpdateTodayWorkItemForTransferInput;
};

export type Newsletter = {
  __typename?: 'Newsletter';
  id: Scalars['ID']['output'];
  originLink?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  sourceLink?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type NewslettersInput = {
  source?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  newsletters?: Maybe<Array<Maybe<Newsletter>>>;
  suggestions?: Maybe<Array<Maybe<Work>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  work?: Maybe<Work>;
  works?: Maybe<Array<Maybe<Work>>>;
};

export type QueryNewslettersArgs = {
  input: NewslettersInput;
};

export type QuerySuggestionsArgs = {
  input: SuggestionsInput;
};

export type QueryWorkArgs = {
  input?: InputMaybe<WorkInput>;
};

export type QueryWorksArgs = {
  input: WorksInput;
};

export type SuggestionsInput = {
  title: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTodayWorkItemForTransferInput = {
  id: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
};

export type UpdateTodayWorkItemInput = {
  content: Scalars['String']['input'];
  itemId: Scalars['ID']['input'];
  tag?: InputMaybe<Scalars['String']['input']>;
  time: Scalars['Int']['input'];
  title: Scalars['String']['input'];
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
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  tag?: Maybe<Scalars['String']['output']>;
  time: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  workItems?: Maybe<Array<Maybe<WorkItem>>>;
};

export type WorkInput = {
  itemId: Scalars['ID']['input'];
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type WorkItem = {
  __typename?: 'WorkItem';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  itemId: Scalars['ID']['output'];
  time: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type WorksInput = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type NewslettersQueryVariables = Exact<{
  input: NewslettersInput;
}>;

export type NewslettersQuery = {
  __typename?: 'Query';
  newsletters?: Array<{
    __typename?: 'Newsletter';
    id: string;
    title: string;
    source?: string | null;
    sourceLink?: string | null;
    originLink?: string | null;
  } | null> | null;
};

export type WorksQueryVariables = Exact<{
  input: WorksInput;
}>;

export type WorksQuery = {
  __typename?: 'Query';
  works?: Array<{
    __typename?: 'Work';
    id: string;
    title: string;
    time: number;
    createdAt: string;
    updatedAt: string;
    workItems?: Array<{
      __typename?: 'WorkItem';
      itemId: string;
      content: string;
      time: number;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
  } | null> | null;
};

export type CreateTodayWorkItemMutationVariables = Exact<{
  input: CreateTodayWorkItemInput;
}>;

export type CreateTodayWorkItemMutation = {
  __typename?: 'Mutation';
  createTodayWorkItem: { __typename?: 'Work'; id: string };
};

export type UpdateTodayWOrkItemMutationVariables = Exact<{
  input: UpdateTodayWorkItemInput;
}>;

export type UpdateTodayWOrkItemMutation = {
  __typename?: 'Mutation';
  updateTodayWorkItem: { __typename?: 'Work'; id: string };
};

export type UpdateTodayWorkItemForTransferMutationVariables = Exact<{
  input: UpdateTodayWorkItemForTransferInput;
}>;

export type UpdateTodayWorkItemForTransferMutation = {
  __typename?: 'Mutation';
  updateTodayWorkItemForTransfer: { __typename?: 'Work'; id: string };
};

export type DeleteTodayWorkItemMutationVariables = Exact<{
  itemId: Scalars['ID']['input'];
}>;

export type DeleteTodayWorkItemMutation = {
  __typename?: 'Mutation';
  deleteTodayWorkItem: { __typename?: 'WorkItem'; itemId: string };
};

export type SendWeeklyReportMutationVariables = Exact<{ [key: string]: never }>;

export type SendWeeklyReportMutation = { __typename?: 'Mutation'; sendWeeklyReport: boolean };

export type SuggestionsQueryVariables = Exact<{
  input: SuggestionsInput;
}>;

export type SuggestionsQuery = {
  __typename?: 'Query';
  suggestions?: Array<{ __typename?: 'Work'; title: string } | null> | null;
};
