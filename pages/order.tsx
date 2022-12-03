import { TrashIcon } from '@heroicons/react/outline';
import { useCartState } from 'components/Header/Cart/CartContext';
import { useMemo } from 'react';

const CartContent = () => {
  const cartState = useCartState();
  return (
    <div className="col-span-2">
      {cartState.items && cartState.items.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {cartState.items.map((item, index) => (
            <li
              key={`${item.title}_${index}`}
              className="py-4 flex justify-between"
            >
              <div>
                {item.count} x {item.title}
              </div>
              <div className="flex align-middle">
                {item.price}$
                <button
                  className="ml-2 text-red-500"
                  onClick={() => cartState.removeItemFromCart(item.id)}
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        'Brak produktów w koszyku'
      )}
    </div>
  );
};

const CartSummary = () => {
  const { items } = useCartState();

  const fullAmount = useMemo(
    () => items?.reduce((acc, item) => acc + item.price * item.count, 0),
    [items]
  );

  return (
    <div>
      Podsumowanie koszyka
      <div>Liczba elementów: {items ? items.length : 0}</div>
      <div>
        Kwota do zapłacenia: <span className="font-bold">{fullAmount}$</span>
      </div>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mt-2 border border-gray-400 rounded shadow">
        Płacę
      </button>
    </div>
  );
};

const CartPage = () => {
  return (
    <div className="max-w-2xl mx-auto w-full p-4">
      <div className="grid grid-cols-3 gap-8">
        <CartContent />
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
