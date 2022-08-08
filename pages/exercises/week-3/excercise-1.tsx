import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

const getProducts = async (page: string | string[]) => {
  const take = 25;
  const offset = (Number(page) - 1) * 25;
  const res = await axios.get(`https://naszsklep-api.vercel.app/api/products`, {
    params: { take, offset },
  });
  const data: StoreApiResponse[] = res.data;
  return data;
};

const AboutPage = () => {
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
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">Main</main>
      <Footer />
    </>
  );
};

export default AboutPage;
