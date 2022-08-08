import axios from 'axios';
import { DEFAULT_TAKE, NASZSKLEP_API_URL } from '../constants/consts';

interface Product {
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

export const getProducts = async (page: string | string[]) => {
  const take = DEFAULT_TAKE;
  const offset = (Number(page) - 1) * take;
  const res = await axios.get(`${NASZSKLEP_API_URL}/products`, {
    params: { take, offset },
  });
  const data: Product[] = res.data;
  return data;
};
