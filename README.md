This is a [Next.js](https://nextjs.org/) application, that served as a sandbox for me to solve assignments/test the knowledge I had acquired from the [Modern Frontend](https://hyperfunctor.com/nextjs-react-graphql-typescript) course. It is not a finished application, it only contains elements of such. 

I did not use all the good code development practices I know in this application.

I plan to return to this application once I have completed other projects I am working on.

## U can watch this app live [here](https://ecommerce-shop-jade.vercel.app).

## Running app locally

First, install required dependencies:

```bash
pnpm install
# or
npm install
# or
yarn
```

First, run the development server:

```bash
pnpm run dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# e-commerce sandbox shop
## U can watch it live [HERE](https://ecommerce-shop-jade.vercel.app)

![Project preview](https://cdn.discordapp.com/attachments/886777507364347946/1069956202861170768/image.png)
**_Built using Next.js, Typescript, GraphCMS, GraphQL, TailwindCSS_**

## Features and Fuctionality

- Google authentication & authorization (using next-auth)
- Cart CRUD (made with providers)
- Rendering list of items with pagination done in 3 ways (CSR, SSR, SSG)
- Deployment integration with Checkly 
- Displaying Markdown coming from API
- Integration with GraphCMS (mutations, fragments, queries)
- Integration with Stripe payments
- Forms made with React Hook Form & yup libraries
- Proxy calls via Next.js routes
- Few basic tests

## Fuctionalities to implement

- [ ] Fix existing bugs :smile:  
- [ ] Better handling of Stripe payments (including safe webhooks)
- [ ] Make an actual app out of it
- [ ] Creating an public account so that the application can be viewed without logging in
