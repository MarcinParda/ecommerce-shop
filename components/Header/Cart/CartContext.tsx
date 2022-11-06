import { CartItem } from 'interfaces';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getCartItemsFromStorage, setCartItemsInStorage } from './cartModel';

interface CartState {
  readonly items: readonly CartItem[] | undefined;
  readonly addItemToCart: (item: CartItem) => void;
  readonly removeItemFromCart: (id: CartItem['id']) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);

  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, []);

  useEffect(() => {
    if (cartItems === undefined) {
      return;
    }
    setCartItemsInStorage(cartItems);
  }, [cartItems]);

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems,
        // TODO: Refactor those functions
        addItemToCart: (item) => {
          setCartItems((prevState) => {
            if (!prevState) {
              return [item];
            }
            const existingItem = prevState.find(
              (existingItem) => existingItem.id === item.id
            );
            if (!existingItem) {
              return [...prevState, item];
            }
            return prevState.map((existingItem) => {
              return existingItem.id === item.id
                ? { ...existingItem, count: existingItem.count + 1 }
                : existingItem;
            });
          });
        },
        removeItemFromCart: (id) => {
          setCartItems((prevState) => {
            if (!prevState) {
              return [];
            }
            const existingItem = prevState.find((element) => element.id === id);
            if (existingItem && existingItem.count <= 1) {
              return prevState.filter((existingItem) => existingItem.id !== id);
            }
            return prevState.map((existingItem) => {
              return existingItem.id === id
                ? { ...existingItem, count: existingItem.count - 1 }
                : existingItem;
            });
          });
        },
      }}
    >
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
