import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clar8abrr6zan01ujca8m96i7/master',
});

const authLink = setContext((_, { headers }) => {
  const token = `Bearer ${process.env.GRAPHCMS_TOKEN}`;

  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});

export const apolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clar8abrr6zan01ujca8m96i7/master',
  cache: new InMemoryCache(),
});

export const authorizedApolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
