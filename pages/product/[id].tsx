import { useQuery } from '@tanstack/react-query';
import { getProduct } from 'api/products';
import AppMarkdown from 'components/AppMarkdown';
import { useRouter } from 'next/router';

const ProductPage = () => {
  const router = useRouter();

  const { id = '1' } = router.query;

  const { isLoading, data, error } = useQuery(['product', id], () =>
    getProduct(id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || error) {
    return <div>Something went wrong.</div>;
  }

  const { longDescription } = data;
  return (
    <>
      <article className="prose lg:prose-xl">
        <AppMarkdown>{longDescription}</AppMarkdown>
      </article>
    </>
  );
};

export default ProductPage;
