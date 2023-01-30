import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Input';
import { FormValues } from 'interfaces';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const signUpFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignupPage = () => {
  const session = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpFormSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });

  if (session.status === 'authenticated') {
    router.push('/');
    return null;
  }

  return (
    <form className="mx-auto max-w-lg px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
      <h2>Rejestracja</h2>
      <div className="mb-6">
        <Input
          name="email"
          label="Email"
          type="text"
          placeholder="wpisz swój email..."
          register={register}
          errorMessage={errors.email?.message}
        />
        <Input
          name="password"
          label="Hasło"
          type="password"
          placeholder="wpisz swoje hasło..."
          register={register}
          errorMessage={errors.password?.message}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium leading-5 text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
          type="submit"
        >
          Zarejestruj się
        </button>
      </div>
    </form>
  );
};

export default SignupPage;
