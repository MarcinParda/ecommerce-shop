import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Input';
import { TextArea } from 'components/TextArea';
import {
  CreateProductReviewDocument,
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables,
} from 'generated/graphql';
import { apolloClient } from 'graphql/apolloClient';
import { CreateReviewFormData, FormValues } from 'interfaces';
import { useForm } from 'react-hook-form';
import { createReviewFormSchema } from 'schemas/orderForm';

export const AddReviewForm = ({ productId }: { productId: string }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(createReviewFormSchema),
  });

  const onSubmit = async (data: CreateReviewFormData) => {
    try {
      const response = await apolloClient.mutate<
        CreateProductReviewMutation,
        CreateProductReviewMutationVariables
      >({
        mutation: CreateProductReviewDocument,
        variables: {
          review: {
            ...data,
            product: {
              connect: {
                id: productId,
              },
            },
          },
        },
      });
      reset();
      alert('Recenzja stworzona!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <h2>Napisz recenzję</h2>
      <div className="mb-6">
        <Input
          name="headline"
          label="Tytuł recenzji"
          type="text"
          placeholder="wpisz tytuł recenzji..."
          register={register}
          errorMessage={errors.headline?.message}
        />
        <Input
          name="name"
          label="Imię"
          type="text"
          placeholder="wpisz swoje imię..."
          register={register}
          errorMessage={errors.name?.message}
        />
        <Input
          name="email"
          label="Email"
          type="text"
          placeholder="wpisz swój email..."
          register={register}
          errorMessage={errors.email?.message}
        />
        <TextArea
          name="content"
          label="Recenzja"
          placeholder="napisz swoją recenzję..."
          register={register}
          errorMessage={errors.content?.message}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium leading-5 text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
          type="submit"
        >
          Add review
        </button>
      </div>
    </form>
  );
};
