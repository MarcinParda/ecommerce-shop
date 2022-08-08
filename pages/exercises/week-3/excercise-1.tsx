import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getProducts } from '../../../api/products';
import { Header } from '../../../components/Header';
import Pagination from '../../../components/Pagination';
import { DEFAULT_TAKE } from '../../../constants/consts';

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
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <ul className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <li key={product.id}>
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img src={product.image} alt={product.title} />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${product.price}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Pagination currentPage={Number(page)} take={DEFAULT_TAKE} />
    </div>
  );
};

export default Exercise1Page;
