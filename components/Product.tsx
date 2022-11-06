import Image from 'next/image';
import React from 'react';
import { useCartState } from './Header/Cart/CartContext';

interface Props {
  image: string;
  title: string;
  price: number;
  id: number;
}

export default function Product({ image, price, title, id }: Props) {
  const cartState = useCartState();
  return (
    <div className="flex flex-col">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <Image
          src={image}
          alt={title}
          layout="responsive"
          width={1}
          height={1}
          objectFit="fill"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${price}</p>
      <button
        onClick={() => cartState.addItemToCart({ price, title, count: 1, id })}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mt-2 border border-gray-400 rounded shadow"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
}
