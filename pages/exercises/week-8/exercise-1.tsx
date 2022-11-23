import { Form } from 'components/Form';
import { Input } from 'components/Input';
import { FormValues } from 'interfaces';
import { useForm } from 'react-hook-form';
import { formSchema } from 'schemas';
import { yupResolver } from '@hookform/resolvers/yup';

const Exercise1Page = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <header>
        <h2 className="text-4xl py-8 lg:py-12 text-center">Input</h2>
      </header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="firstName"
          label="Imię"
          type="text"
          placeholder="wpisz imię..."
          register={register}
          errorMessage={errors.firstName?.message}
        />
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </main>
  );
};

export default Exercise1Page;
