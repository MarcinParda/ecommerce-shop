import Product from 'components/Product';
import {
  GetProductsListDocument,
  GetProductsListQuery,
} from 'generated/graphql';
import { apolloClient } from 'graphql/apolloClient';
import { InferGetServerSidePropsType } from 'next';

const Exercise1Page = ({
  data,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <>
      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <header>
          <h2 className="text-4xl py-8 lg:py-12 text-center">Products</h2>
        </header>
        <ul className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.products.map((product) => (
            <li key={product.id}>
              <Product
                image={product.images[0].url}
                price={product.price}
                title={product.name}
                id={product.id}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Exercise1Page;

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetProductsListQuery>({
    query: GetProductsListDocument,
  });

  return {
    props: { data },
  };
};
