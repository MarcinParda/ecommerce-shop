import { CartContent } from 'components/CartContent';
import { useCartState } from 'components/Header/Cart/CartContext';
import Link from 'next/link';
import { useMemo } from 'react';

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
      {items && items.length > 0 && (
        <Link href="/order">
          <a className="text-blue-500 underline hover:text-blue-700">Płacę</a>
        </Link>
      )}
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
