import { createContext, ReactNode, useContext, useState } from 'react';

interface CartItem {
  price: number;
  title: string;
}

interface CartState {
  items: CartItem[];
  // addItemToCart: () => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const initialCartState: CartItem[] = [
    {
      price: 0.69,
      title: 'Książka',
    },
  ];
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartState);

  return (
    <CartStateContext.Provider value={{ items: cartItems }}>
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error(`You forgot CartStateContextProvider!`);
  }
  return cartState;
};
