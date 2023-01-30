import {
  GetAccountByEmailDocument,
  GetAccountByEmailQuery,
  GetAccountByEmailQueryVariables,
} from 'generated/graphql';
import { authorizedApolloClient } from 'graphql/apolloClient';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Logowanie hasłem',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Hasło', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error('Brak danych logowania');
        }

        if (!credentials.username || !credentials.password) {
          throw new Error('Email i hasło są wymagane');
        }

        const userByEmail = await authorizedApolloClient.query<
          GetAccountByEmailQuery,
          GetAccountByEmailQueryVariables
        >({
          query: GetAccountByEmailDocument,
          variables: {
            email: credentials.username,
          },
        });

        console.log(userByEmail);

        if (!userByEmail.data.account?.password) {
          throw new Error('Nie znaleziono użytkownika');
        }

        const arePasswordsEqual = await bcrypt.compare(
          credentials.password,
          userByEmail.data.account.password
        );

        if (!arePasswordsEqual) {
          throw new Error('Niepoprawne hasło');
        }

        return {
          id: userByEmail.data.account.id,
          email: userByEmail.data.account.email,
        };
      },
    }),
  ],
});
