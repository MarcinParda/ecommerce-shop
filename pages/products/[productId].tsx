import AppMarkdown from 'components/AppMarkdown';
import {
  GetProductDetailsDocument,
  GetProductDetailsQuery,
  GetProductDetailsQueryVariables,
  GetProductsIdsDocument,
  GetProductsIdsQuery,
} from 'generated/graphql';
import { apolloClient } from 'graphql/apolloClient';
import { InferGetStaticPaths } from 'interfaces';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';

const ProductPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data?.product) {
    return <div>Coś poszło nie tak...</div>;
  }

  const {
    product: { description, images, name, price },
  } = data;

  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-center items-center flex-col">
      <header>
        <h1 className="py-8">{name}</h1>
      </header>
      <div className="w-6/12">
        <Image
          src={images[0].url}
          alt={name}
          layout="responsive"
          width={1}
          height={1}
          objectFit="fill"
        />
      </div>
      <span className="text-4xl py-5">Price: {price}$</span>
      <p>
        <h2>{description}</h2>
      </p>
    </main>
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
