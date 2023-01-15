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
  {
    description: 'Organizacja pracy, SEO i Markdown',
    number: 5,
    exercises: [
      {
        number: 1,
        codeHref: '/pages/exercises/week-5/exercise-1.tsx',
        description:
          'Zadanie 1 & 2. Popraw components przekazywane do markdowna tak, aby Nie opakowywać linków prowadzących do zewnętrznych stron w komponent <Link> Dodać do linków zewnętrznych atrybuty rel=noopener noreferrer',
      },
    ],
  },
  {
    description: 'GraphQL',
    number: 7,
    exercises: [
      {
        number: 1,
        codeHref: '/pages/exercises/week-7/exercise-1.tsx',
        description:
          'Korzystając z GraphQL, pobierz i wyświetl listę produktów w swojej aplikacji. Następnie, pobierz i wyświetl widok pojedynczego produktu.',
      },
    ],
  },
  {
    description: 'Formularze',
    number: 8,
    exercises: [
      {
        number: 1,
        codeHref: '/pages/exercises/week-8/exercise-1.tsx',
        description:
          'Stwórz reużywalny komponent Input, który pozwoli na uniknięcie powielania kodu. Taki komponent powinien zawierać w sobie label, input oraz informacje o błędzie jeśli takowy się pojawi. Zaimplementuj to tak, aby Twój komponent poprawnie działał z React Hook Form.',
      },
      {
        number: 2,
        codeHref: '/pages/exercises/week-8/exercise-1.tsx',
        liveHref: '/products/ckdu44mn40gxh010405uwgbtw',
        description:
          'Korzystając z yup, dodaj walidację do swojego formularza. Następnie przetłumacz błędy na język polski i skonfiguruj yup tak, aby wyświetlały się Twoje tłumaczenia zamiast oryginałów po angielsku.',
      },
    ],
  },
  {
    description: 'Formularze',
    number: 9,
    exercises: [
      {
        number: 1,
        codeHref: '/pages/exercises/week-8/exercise-1.tsx',
        liveHref: '/create-order',
        description:
          'Tymczasowo spraw, aby wysłanie formularza "checkout" powodowało tworzenie nowego zamówienia i zapisywanie go w GraphCMS. * docelowo nie będzie to robione po stronie frontendu tylko dopiero po potwierdzeniu płatności :)',
      },
      {
        number: 2,
        codeHref: '/pages/products/AddReviewForm.tsx',
        liveHref: '/products/ckdu44mn40gxh010405uwgbtw',
        description:
          'Stwórz formularz dodawania recenzji do produktów i wywołaj odpowiednią mutację aby zapisać recenzje w GraphCMS.',
      },
    ],
  },
  {
    description: 'Next.js i API',
    number: 10,
    exercises: [
      {
        number: 1,
        codeHref: '/pages/exercises/week-9/exercise-1.tsx',
        description: 'Zaimplementuj formularz zapisywania się na mailing.',
      },
    ],
  },
];

export const repoUrl =
  'https://github.com/MarcinParda/ecommerce-shop/blob/main';
