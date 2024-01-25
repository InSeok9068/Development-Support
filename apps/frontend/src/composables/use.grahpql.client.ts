import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_URL });

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  let uid = '';

  const auth = localStorage.getItem('auth');
  let authLocalStorage;
  if (auth) {
    authLocalStorage = JSON.parse(auth);
    uid = authLocalStorage.authArgs.uid;
  }

  operation.setContext({
    headers: {
      authorization: uid,
    },
  });
  return forward(operation);
});

const unauthorizedLink = onError(({ networkError }) => {
  if (networkError) {
    if ((networkError as any)?.statusCode === 401) location.href = '/login';
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
