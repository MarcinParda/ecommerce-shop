import {
  ReviewContentFragment,
  useGetReviewsForProductIdQuery,
} from 'generated/graphql';

interface ProductReviewListId {
  productId: string;
}

export const ProductReviewList = ({
  productId,
}: ProductReviewListId): JSX.Element => {
  const { data, loading, error } = useGetReviewsForProductIdQuery({
    variables: { id: productId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.product?.reviews || data.product.reviews.length === 0) {
    return <p>No reviews found</p>;
  }

  return (
    <ul>
      {data.product.reviews.map((review) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
};

interface ProductReviewItemProps {
  review: ReviewContentFragment;
}

const ProductReviewItem = ({ review }: ProductReviewItemProps) => {
  const isOptimistic = review.id.startsWith('-');
  return (
    <li className={`${isOptimistic ? 'opacity-50 text-gray-500' : ''}`}>
      <p>{review.content}</p>
      <p>{review.rating}</p>
    </li>
  );
};
