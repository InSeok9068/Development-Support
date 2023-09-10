import { ApolloClient, InMemoryCache, type NormalizedCacheObject } from '@apollo/client/core';
import type { App } from 'vue';

//플러그인 종류
export const PLUGIN_GRAPHQL_NAME = 'graphql';

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export interface IPlgGraphql {
  client: ApolloClient<NormalizedCacheObject>;
}

export default {
  install(app: App) {
    const graphql: IPlgGraphql = {
      client: apolloClient,
    };
    app.config.globalProperties.$graphql = graphql;
    app.provide(PLUGIN_GRAPHQL_NAME, app.config.globalProperties.$graphql);
  },
};
