import { ShoppingCartIcon } from '@heroicons/react/outline';
import IconWithBadge from 'components/IconWithBadge';
import Link from 'next/link';
import { useCartState } from './CartContext';

const CartBar = () => {
  const cartState = useCartState();
  return (
    <Link href="/cart">
      <a className='className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white "'>
        <span className="sr-only">View cart</span>
        <IconWithBadge
          badgeNumber={cartState?.items.length}
          icon={<ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />}
        />
      </a>
    </Link>
  );
};

export default CartBar;
