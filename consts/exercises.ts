import { Week } from '../interfaces';

export const weeks: Week[] = [
  {
    description: 'CSS Styling & Tailwind',
    number: 2,
    exercises: [
      {
        number: 1,
        codeHref: '/pages/exercises/week-2/exercise-1.tsx',
        description: 'Style your application using ready-made solutions.',
      },
    ],
  },
  {
    description: 'Rendering in Next.js',
    number: 3,
    exercises: [
      {
        number: 1,
        codeHref: '/pages/exercises/week-3/exercise-1.tsx',
        description:
          'Using the endpoint https://naszsklep-api.vercel.app/api/products create a pagination component. Download data on the client side (CSR -> useQuery).',
      },
      {
        number: 2,
        codeHref: '/pages/exercises/week-3/exercise-2/[page].tsx',
        liveHref: '/exercises/week-3/exercise-2/1',
        description:
          'Using the endpoint https://naszsklep-api.vercel.app/api/products create a pagination component. Download the data while building the application (SSG -> getStaticProps, getStaticPaths). You have to take into account that now the page number must be included in the address and passed as a parameter.',
      },
      {
        number: 3,
        codeHref: '/pages/exercises/week-3/exercise-3/[page].tsx',
        liveHref: '/exercises/week-3/exercise-3/1',
        description:
          'Using the endpoint https://naszsklep-api.vercel.app/api/products create a pagination component. Download the data while building the application (SSG -> getStaticProps, getStaticPaths). You have to take into account that now the page number must be included in the address and passed as a parameter. However, there are many products (over 4,000,000). Dont render all of them while building the page!',
      },
    ],
  },
];

export const repoUrl =
  'https://github.com/MarcinParda/ecommerce-shop/blob/main';
