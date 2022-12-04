import { ShoppingCartIcon } from '@heroicons/react/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import AppMarkdown from 'components/AppMarkdown';
import { useCartState } from 'components/Header/Cart/CartContext';
import { Input } from 'components/Input';
import { TextArea } from 'components/TextArea';
import {
  CreateOrderDocument,
  CreateProductReviewDocument,
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables,
  GetProductDetailsDocument,
  GetProductDetailsQuery,
  GetProductDetailsQueryVariables,
  GetProductsIdsDocument,
  GetProductsIdsQuery,
} from 'generated/graphql';
import { apolloClient } from 'graphql/apolloClient';
import {
  CartItem,
  CreateReviewFormData,
  FormValues,
  InferGetStaticPaths,
} from 'interfaces';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { createReviewFormSchema, orderFormSchema } from 'schemas/orderForm';

const ProductPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { addItemToCart } = useCartState();

  if (!data?.product) {
    return <div>Coś poszło nie tak...</div>;
  }

  const {
    product: { description, images, name, price, id },
  } = data;

  const item: CartItem = {
    id,
    title: name,
    price,
    count: 1,
  };

  return (
    <div className="mx-auto max-w-4xl overflow-hidden grid grid-cols-2">
      <section>
        <Image
          src={images[0].url}
          alt="product"
          layout="responsive"
          width={1}
          height={1}
          objectFit="cover"
        />
        <div className="px-6 py-4">
          <h3 className="font-bold text-xl mb-2">{name}</h3>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            ${price}
          </span>
        </div>
        <button
          onClick={() => addItemToCart(item)}
          className="mx-6 inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium leading-5 text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
        >
          <ShoppingCartIcon className="w-5 h-5 rounded-full shadow transform transition-all duration-300 ease-in-out group-hover:translate-x-1 group-active:translate-x-2" />
          <span className="ml-2">Dodaj do koszyka</span>
        </button>
      </section>
      <section>
        <AddReviewForm productId={id} />
      </section>
    </div>
  );
};

export default ProductPage;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductsIdsQuery>({
    query: GetProductsIdsDocument,
  });

  return {
    paths: data.products.map((product) => ({
      params: {
        productId: product.id.toString(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { data } = await apolloClient.query<
    GetProductDetailsQuery,
    GetProductDetailsQueryVariables
  >({
    query: GetProductDetailsDocument,
    variables: {
      id: params.productId,
    },
  });

  return {
    props: {
      data,
    },
  };
};

const AddReviewForm = ({ productId }: { productId: string }) => {
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
