import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clar8abrr6zan01ujca8m96i7/master',
  cache: new InMemoryCache(),
});
