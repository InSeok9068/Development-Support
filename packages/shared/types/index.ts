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
  AccountNumber: { input: any; output: any };
  BigInt: { input: any; output: any };
  Byte: { input: any; output: any };
  CountryCode: { input: any; output: any };
  Cuid: { input: any; output: any };
  Currency: { input: any; output: any };
  DID: { input: any; output: any };
  Date: { input: Date; output: Date };
  DateTime: { input: Date; output: Date };
  DateTimeISO: { input: any; output: any };
  DeweyDecimal: { input: any; output: any };
  Duration: { input: any; output: any };
  EmailAddress: { input: any; output: any };
  GUID: { input: any; output: any };
  HSL: { input: any; output: any };
  HSLA: { input: any; output: any };
  HexColorCode: { input: any; output: any };
  Hexadecimal: { input: any; output: any };
  IBAN: { input: any; output: any };
  IP: { input: any; output: any };
  IPCPatent: { input: any; output: any };
  IPv4: { input: any; output: any };
  IPv6: { input: any; output: any };
  ISBN: { input: any; output: any };
  ISO8601Duration: { input: any; output: any };
  JSON: { input: any; output: any };
  JSONObject: { input: any; output: any };
  JWT: { input: any; output: any };
  LCCSubclass: { input: any; output: any };
  Latitude: { input: any; output: any };
  LocalDate: { input: any; output: any };
  LocalDateTime: { input: any; output: any };
  LocalEndTime: { input: any; output: any };
  LocalTime: { input: any; output: any };
  Locale: { input: any; output: any };
  Long: { input: any; output: any };
  Longitude: { input: any; output: any };
  MAC: { input: any; output: any };
  NegativeFloat: { input: any; output: any };
  NegativeInt: { input: any; output: any };
  NonEmptyString: { input: any; output: any };
  NonNegativeFloat: { input: any; output: any };
  NonNegativeInt: { input: any; output: any };
  NonPositiveFloat: { input: any; output: any };
  NonPositiveInt: { input: any; output: any };
  ObjectID: { input: any; output: any };
  PhoneNumber: { input: any; output: any };
  Port: { input: any; output: any };
  PositiveFloat: { input: any; output: any };
  PositiveInt: { input: any; output: any };
  PostalCode: { input: any; output: any };
  RGB: { input: any; output: any };
  RGBA: { input: any; output: any };
  RoutingNumber: { input: any; output: any };
  SESSN: { input: any; output: any };
  SafeInt: { input: any; output: any };
  SemVer: { input: any; output: any };
  Time: { input: any; output: any };
  TimeZone: { input: any; output: any };
  Timestamp: { input: any; output: any };
  URL: { input: any; output: any };
  USCurrency: { input: any; output: any };
  UUID: { input: any; output: any };
  UnsignedFloat: { input: any; output: any };
  UnsignedInt: { input: any; output: any };
  UtcOffset: { input: any; output: any };
  Void: { input: any; output: any };
};

export type CreateNewsletterInput = {
  originLink?: InputMaybe<Scalars['String']['input']>;
  source: Source;
  sourceLink?: InputMaybe<Scalars['String']['input']>;
  sourceUniqueKey?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateTodayWorkItemInput = {
  content: Scalars['String']['input'];
  date: Scalars['DateTime']['input'];
  tag?: InputMaybe<Scalars['String']['input']>;
  time: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type Menu = {
  __typename?: 'Menu';
  badge?: Maybe<Scalars['String']['output']>;
  children?: Maybe<Array<Maybe<Menu>>>;
  class?: Maybe<Scalars['String']['output']>;
  component?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  label: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  preventExact?: Maybe<Scalars['Boolean']['output']>;
  target?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type MenuPermissionInput = {
  to: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type MenuPermissionResponse = {
  __typename?: 'MenuPermissionResponse';
  hasAccess: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
  redirectUrl?: Maybe<Scalars['String']['output']>;
};

export type MenusInput = {
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodayWorkItem: Work;
  deleteTodayWorkItem: WorkItem;
  nowScrapingNewsletters: Array<Maybe<Newsletter>>;
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

export const NameSuggestionsCrud = {
  Create: 'CREATE',
  Delete: 'DELETE',
  Read: 'READ',
  Update: 'UPDATE',
} as const;

export type NameSuggestionsCrud = (typeof NameSuggestionsCrud)[keyof typeof NameSuggestionsCrud];
export type NameSuggestionsInput = {
  crud: Scalars['String']['input'];
  input: Scalars['String']['input'];
  lang: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export const NameSuggestionsLang = {
  Java: 'JAVA',
  JavaScript: 'JAVA_SCRIPT',
  TypeScript: 'TYPE_SCRIPT',
} as const;

export type NameSuggestionsLang = (typeof NameSuggestionsLang)[keyof typeof NameSuggestionsLang];
export const NameSuggestionsType = {
  Class: 'CLASS',
  Method: 'METHOD',
  Url: 'URL',
  Variable: 'VARIABLE',
} as const;

export type NameSuggestionsType = (typeof NameSuggestionsType)[keyof typeof NameSuggestionsType];
export type Newsletter = {
  __typename?: 'Newsletter';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  originLink?: Maybe<Scalars['String']['output']>;
  source: Source;
  sourceLink?: Maybe<Scalars['String']['output']>;
  sourceUniqueKey?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type NewslettersInput = {
  source?: InputMaybe<Source>;
};

export type Query = {
  __typename?: 'Query';
  menuPermission: MenuPermissionResponse;
  menus: Array<Maybe<Menu>>;
  nameSuggestions: Scalars['String']['output'];
  newsletters: Array<Maybe<Newsletter>>;
  suggestions: Array<Maybe<Work>>;
  work?: Maybe<Work>;
  works: Array<Maybe<Work>>;
};

export type QueryMenuPermissionArgs = {
  input: MenuPermissionInput;
};

export type QueryMenusArgs = {
  input?: InputMaybe<MenusInput>;
};

export type QueryNameSuggestionsArgs = {
  input: NameSuggestionsInput;
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

export const Role = {
  Admin: 'ADMIN',
  Guest: 'GUEST',
  User: 'USER',
} as const;

export type Role = (typeof Role)[keyof typeof Role];
export const Source = {
  GeekNews: 'GEEK_NEWS',
  Yozm: 'YOZM',
} as const;

export type Source = (typeof Source)[keyof typeof Source];
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
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  uid: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Work = {
  __typename?: 'Work';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  tag?: Maybe<Scalars['String']['output']>;
  time: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  workItems: Array<WorkItem>;
};

export type WorkInput = {
  itemId: Scalars['ID']['input'];
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type WorkItem = {
  __typename?: 'WorkItem';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  itemId: Scalars['ID']['output'];
  time: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type WorksInput = {
  endDate: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type MenusQueryVariables = Exact<{
  input?: InputMaybe<MenusInput>;
}>;

export type MenusQuery = {
  __typename?: 'Query';
  menus: Array<{
    __typename?: 'Menu';
    label: string;
    icon?: string | null;
    to?: string | null;
    component?: string | null;
    class?: string | null;
    url?: string | null;
    target?: string | null;
    badge?: string | null;
    preventExact?: boolean | null;
    order: number;
    children?: Array<{
      __typename?: 'Menu';
      label: string;
      icon?: string | null;
      to?: string | null;
      component?: string | null;
      class?: string | null;
      url?: string | null;
      target?: string | null;
      badge?: string | null;
      preventExact?: boolean | null;
      order: number;
      children?: Array<{
        __typename?: 'Menu';
        label: string;
        icon?: string | null;
        to?: string | null;
        component?: string | null;
        class?: string | null;
        url?: string | null;
        target?: string | null;
        badge?: string | null;
        preventExact?: boolean | null;
        order: number;
      } | null> | null;
    } | null> | null;
  } | null>;
};

export type MenuPermissionQueryVariables = Exact<{
  input: MenuPermissionInput;
}>;

export type MenuPermissionQuery = {
  __typename?: 'Query';
  menuPermission: {
    __typename?: 'MenuPermissionResponse';
    hasAccess: boolean;
    message?: string | null;
    redirectUrl?: string | null;
  };
};

export type NameSuggestionsQueryVariables = Exact<{
  input: NameSuggestionsInput;
}>;

export type NameSuggestionsQuery = { __typename?: 'Query'; nameSuggestions: string };

export type NewslettersQueryVariables = Exact<{
  input: NewslettersInput;
}>;

export type NewslettersQuery = {
  __typename?: 'Query';
  newsletters: Array<{
    __typename?: 'Newsletter';
    id: string;
    title: string;
    source: Source;
    sourceLink?: string | null;
    originLink?: string | null;
  } | null>;
};

export type NowScrapingNewslettersMutationVariables = Exact<{ [key: string]: never }>;

export type NowScrapingNewslettersMutation = {
  __typename?: 'Mutation';
  nowScrapingNewsletters: Array<{ __typename?: 'Newsletter'; id: string } | null>;
};

export type WorksQueryVariables = Exact<{
  input: WorksInput;
}>;

export type WorksQuery = {
  __typename?: 'Query';
  works: Array<{
    __typename?: 'Work';
    id: string;
    title: string;
    time: number;
    createdAt: Date;
    updatedAt: Date;
    workItems: Array<{
      __typename?: 'WorkItem';
      itemId: string;
      content: string;
      time: number;
      createdAt: Date;
      updatedAt: Date;
    }>;
  } | null>;
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
  suggestions: Array<{ __typename?: 'Work'; title: string } | null>;
};
