import { createContext } from 'react';

interface CartItem {
  price: number;
  title: string;
}

interface CartState {
  cartItems: CartItem[];
}

const cartContext = createContext<CartState | null>(null);
