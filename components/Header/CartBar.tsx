import { ShoppingCartIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const CartBar = () => {
  return (
    <Link href="/cart">
      <a className='className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white "'>
        <span className="sr-only">View notifications</span>
        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
      </a>
    </Link>
  );
};

export default CartBar;
