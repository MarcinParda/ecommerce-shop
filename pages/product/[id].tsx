import { useQuery } from '@tanstack/react-query';
import { getProduct } from 'api/products';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

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
        <ReactMarkdown
          components={{
            a: ({ href, ...props }) => {
              if (!href) {
                return <a {...props}></a>;
              }
              if (href.includes(window.location.origin)) {
                return <a {...props} rel="noopener noreferrer"></a>;
              }
              return (
                <Link href={href}>
                  <a {...props}></a>
                </Link>
              );
            },
          }}
        >
          {longDescription}
        </ReactMarkdown>
      </article>
    </>
  );
};

export default ProductPage;
