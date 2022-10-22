import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getProducts } from '../../../api/products';
import { Header } from '../../../components/Header';
import Pagination from '../../../components/Pagination/Pagination';
import Product from '../../../components/Product';
import { DEFAULT_TAKE } from '../../../constants';

const Exercise1Page = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <Main />
      </main>
    </>
  );
};

const Main = () => {
  const router = useRouter();
  const { page = '1' } = router.query;

  const { isLoading, data, error } = useQuery(['products', page], () =>
    getProducts(page)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || error) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="bg-white">
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
            />
          </li>
        ))}
      </ul>
      <Pagination currentPage={Number(page)} take={DEFAULT_TAKE} />
    </div>
  );
};

export default Exercise1Page;
