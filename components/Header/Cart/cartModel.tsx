import { CART_KEY } from 'consts';
import { CartItem } from 'interfaces';

export const getCartItemsFromStorage = (): CartItem[] => {
  const itemsFromLocalStorage = localStorage.getItem(CART_KEY);
  if (!itemsFromLocalStorage) {
    return [];
  }
  try {
    const items = JSON.parse(itemsFromLocalStorage);
    return items;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
};
