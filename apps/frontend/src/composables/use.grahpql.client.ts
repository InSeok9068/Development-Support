import { useAuth } from '@/composables/auth';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

const { authArgs } = useAuth();

const httpLink = new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_URL });

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const uid = authArgs.value.uid ?? '';
  operation.setContext({
    headers: {
      authorization: uid,
    },
  });
  return forward(operation);
});

const unauthorizedLink = onError(({ networkError }) => {
  if ((networkError as any).statusCode === 401) location.href = '/login';
});

const apolloClient = new ApolloClient({
  link: concat(unauthorizedLink, concat(authLink, httpLink)),
  cache: new InMemoryCache(),
});

export { apolloClient };
