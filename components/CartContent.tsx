import { TrashIcon } from '@heroicons/react/outline';
import { useCartState } from './Header/Cart/CartContext';

export const CartContent = () => {
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
