import { auth } from '@/composables/firebase';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from '@apollo/client/core';

const httpLink = new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const uid = auth.currentUser?.uid ?? '';
  operation.setContext({
    headers: {
      authorization: uid,
    },
  });
  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export { apolloClient };
