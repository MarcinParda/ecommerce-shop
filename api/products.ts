import axios from 'axios';
import { DEFAULT_TAKE } from '../constants';
import { NASZSKLEP_API_URL } from '../constants/api';
import { Product } from '../interfaces';

export const getProducts = async (
  page: string | string[],
  take: number = DEFAULT_TAKE
) => {
  const offset = (Number(page) - 1) * take;
  const res = await axios.get(`${NASZSKLEP_API_URL}/products`, {
    params: { take, offset },
  });
  const data: Product[] | null = res.data;
  return data;
};
