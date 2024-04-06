import { useAuth } from '@/composables/auth';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_URL });

const authLink = new ApolloLink((operation, forward) => {
  const { authArgs } = useAuth();

  // add the authorization to the headers
  let token = '';

  if (authArgs.value.isAuth) {
    token = authArgs.value.token!;
  }

  operation.setContext({
    headers: {
      authorization: token ?? '',
    },
  });
  return forward(operation);
});

const unauthorizedLink = onError(({ networkError }) => {
  if (networkError) {
    if ((networkError as any)?.statusCode === 401) location.href = '/login';
    if ((networkError as any)?.statusCode === 403) setTimeout(() => location.reload(), 2000);
  }
});

const apolloClient = new ApolloClient({
  link: concat(unauthorizedLink, concat(authLink, httpLink)),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
    mutate: {
      fetchPolicy: 'network-only',
    },
  },
});

export { apolloClient };
