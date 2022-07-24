import Link from 'next/link';
import React from 'react';

export const Header = () => {
  return (
    <header>
      <nav className="bg-gray-500">
        <Link href="/">
          <a>Główna</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </header>
  );
};
