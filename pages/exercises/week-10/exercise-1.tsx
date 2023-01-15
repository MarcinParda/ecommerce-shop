import { Input } from 'components/Input';
import { FormValues, MailingFormData } from 'interfaces';
import { useForm } from 'react-hook-form';
import { mailingSchema } from 'schemas';
import { yupResolver } from '@hookform/resolvers/yup';

const Exercise1Page = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(mailingSchema),
  });

  const onSubmit = async (data: MailingFormData) => {
    fetch('/api/mailing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    reset();
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
        />
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default Exercise1Page;
