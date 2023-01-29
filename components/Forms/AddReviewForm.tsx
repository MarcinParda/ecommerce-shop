import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Input';
import { TextArea } from 'components/TextArea';
import {
  GetReviewsForProductIdDocument,
  GetReviewsForProductIdQuery,
  useCreateProductReviewMutation,
  usePublishReviewMutation,
} from 'generated/graphql';
import { FormValues } from 'interfaces';
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

  const [publishReview] = usePublishReviewMutation({
    variables: { id: productId },
  });

  const [createReview, { data, loading, error }] =
    useCreateProductReviewMutation({
      update(cache, { data }) {
        const originalReviewsQuery =
          cache.readQuery<GetReviewsForProductIdQuery>({
            query: GetReviewsForProductIdDocument,
            variables: { id: productId },
          });

        if (!originalReviewsQuery?.product || !data?.review) return;

        const newReviewsQuery = {
          ...originalReviewsQuery,
          product: {
            ...originalReviewsQuery.product,
            reviews: [...originalReviewsQuery.product.reviews, data.review],
          },
        };

        cache.writeQuery({
          query: GetReviewsForProductIdDocument,
          variables: { id: productId },
          data: newReviewsQuery,
        });
      },
      onCompleted: () => {
        publishReview();
      },
    });

  const onSubmit = handleSubmit((data) => {
    const newData = {
      ...data,
      rating: Number(data.rating || '0'),
    };

    createReview({
      variables: {
        review: {
          ...newData,
          product: {
            connect: {
              id: productId,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        review: {
          __typename: 'Review',
          id: (-Math.random()).toString(32),
          ...newData,
        },
      },
    });
  });

  return (
    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
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
        <Input
          name="rating"
          label="Ocena"
          type="number"
          max={5}
          min={1}
          placeholder="ocena..."
          register={register}
          errorMessage={errors.rating?.message}
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
