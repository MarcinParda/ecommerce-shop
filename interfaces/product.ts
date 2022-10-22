export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  rating: Rating;
  thumbnailUrl: string;
  thumbnailAlt: string;
}

interface Rating {
  rate: number;
  count: number;
}
