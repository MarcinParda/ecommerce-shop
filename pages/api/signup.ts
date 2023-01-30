import { NextApiHandler } from 'next';
import * as bcrypt from 'bcrypt';
import { authorizedApolloClient } from 'graphql/apolloClient';
import {
  CreateAccountDocument,
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from 'generated/graphql';

const SignupHandler: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await authorizedApolloClient.mutate<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >({
    mutation: CreateAccountDocument,
    variables: {
      email,
      password: hashedPassword,
    },
  });

  res.json({ userId: user.data?.createAccount?.id });
};

export default SignupHandler;
