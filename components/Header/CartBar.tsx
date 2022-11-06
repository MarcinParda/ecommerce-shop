import { ShoppingCartIcon } from '@heroicons/react/outline';
import IconWithBadge from 'components/IconWithBadge';
import Link from 'next/link';
import { useState } from 'react';

interface CartItem {
  price: number;
  title: string;
}

const initialCartState: CartItem[] = [
  {
    price: 42,
    title: 'Universe',
  },
];

const CartBar = () => {
  const [cart, setCart] = useState<CartItem[]>(initialCartState);
  return (
    <Link href="/cart">
      <a className='className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white "'>
        <span className="sr-only">View cart</span>
        <IconWithBadge
          badgeNumber={cart.length}
          icon={<ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />}
        />
      </a>
    </Link>
  );
};

export default CartBar;
