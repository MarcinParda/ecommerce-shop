import { Input } from 'components/Input';
import { FormValues, MailingFormData } from 'interfaces';
import { useForm } from 'react-hook-form';
import { mailingSchema } from 'schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

const Exercise1Page = () => {
  const [status, setStatus] = useState<'initial' | 'success' | 'error'>(
    'initial'
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(mailingSchema),
  });

  const onSubmit = async (data: MailingFormData) => {
    const response = await fetch('/api/mailing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setStatus('success');
      reset();
    }
    if (!response.ok) {
      setStatus('error');
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <header>
        <h2 className="text-4xl py-8 lg:py-12 text-center">
          Zapisz się na mailing
        </h2>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="wpisz swój email..."
          register={register}
          errorMessage={errors.email?.message}
          data-testid="email-newsletter-input"
          aria-label="Email address"
        />
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
          data-testid="email-newsletter-submit"
        >
          Submit
        </button>
        <div className="mt-4" data-testid="email-newsletter-confirmation">
          {status === 'success' && (
            <p className="text-green-500">Dziękujemy za zapisanie się!</p>
          )}
          {status === 'error' && (
            <p className="text-red-500">Wystąpił błąd, spróbuj ponownie.</p>
          )}
        </div>
      </form>
    </main>
  );
};

export default Exercise1Page;
