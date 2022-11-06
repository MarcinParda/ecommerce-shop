import { getProducts } from 'api/products';
import { Header } from 'components/Header/Header';
import Pagination from 'components/Pagination/Pagination';
import Product from 'components/Product';
import { InferGetStaticPaths } from 'interfaces';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

const Exercise2Page = ({
  data,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (!data) {
    return (
      <>
        <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          Something went wrong.
        </main>
      </>
    );
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <header>
          <h2 className="text-4xl py-8 lg:py-12 text-center">Products</h2>
        </header>
        <ul className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <li key={product.id}>
              <Product
                image={product.image}
                price={product.price}
                title={product.title}
                id={product.id}
              />
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={Number(router.query.page)}
          href={'/exercises/week-3/exercise-2'}
        />
      </main>
    </>
  );
};

export default Exercise2Page;

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.page) {
    return {
      props: {},
      notFound: true,
    };
  }

  const data = await getProducts(params.page);

  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths = async () => {
  const length = 10;
  const pages = Array.from({ length }, (_, idx) => idx + 1);

  return {
    paths: pages.map((page) => {
      return {
        params: {
          page: page.toString(),
        },
      };
    }),
    fallback: false,
  };
};
