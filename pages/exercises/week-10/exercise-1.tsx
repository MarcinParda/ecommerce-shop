import { Input } from 'components/Input';
import { FormValues } from 'interfaces';
import { useForm } from 'react-hook-form';
import { mailingSchema } from 'schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewsletterForm } from 'components/NewsletterForm';

interface Exercise1PageProps {
  onSubmit: (formData: FormValues) => Promise<void>;
  status: 'initial' | 'success' | 'error';
}

export const Exercise1Page = ({ onSubmit, status }: Exercise1PageProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(mailingSchema),
  });

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

export default NewsletterForm;
