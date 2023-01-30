import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from 'components/Layout';
import { CartStateContextProvider } from 'components/Header/Cart/CartContext';
import { apolloClient, authorizedApolloClient } from 'graphql/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={authorizedApolloClient}>
        <ApolloProvider client={apolloClient}>
          <CartStateContextProvider>
            <Layout>
              <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
              </QueryClientProvider>
            </Layout>
          </CartStateContextProvider>
        </ApolloProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
