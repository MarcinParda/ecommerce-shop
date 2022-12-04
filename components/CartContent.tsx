import { TrashIcon } from '@heroicons/react/outline';
import { useCartState } from './Header/Cart/CartContext';

interface Props {
  editable?: boolean;
}

export const CartContent = ({ editable = false }: Props) => {
  const { items, removeItemFromCart } = useCartState();
  return (
    <div>
      <h2>Zawartość koszyka</h2>
      {items && items.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <li
              key={`${item.title}_${index}`}
              className="py-4 flex justify-between"
            >
              <div>
                {item.count} x {item.title}
              </div>
              <div className="flex align-middle">
                {item.price}$
                {editable && (
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        'Brak produktów w koszyku'
      )}
      <div className="mt-4 font-bold">
        Liczba wszystkich elementów: {items && items.length}
      </div>
    </div>
  );
};
