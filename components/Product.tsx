import Image from 'next/image';
import React from 'react';

interface Props {
  image: string;
  title: string;
  price: number;
}

export default function Product({ image, price, title }: Props) {
  return (
    <>
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <Image src={image} alt={title} width={400} height={400} />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${price}</p>
    </>
  );
}
