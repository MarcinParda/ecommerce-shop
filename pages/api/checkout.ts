import {
  GetProductByIdDocument,
  GetProductByIdQuery,
  GetProductByIdQueryVariables,
} from 'generated/graphql';
import { apolloClient } from 'graphql/apolloClient';
import { NextApiHandler } from 'next';
import { Stripe } from 'stripe';

const checkoutHandler: NextApiHandler = async (req, res) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    res.status(500).json({ error: 'Stripe key not found' });
    return;
  }

  const body = req.body as {
    id: string;
    count: number;
  }[];

  const products = await Promise.all(
    body.map(async (item) => {
      const product = await apolloClient.query<
        GetProductByIdQuery,
        GetProductByIdQueryVariables
      >({
        query: GetProductByIdDocument,
        variables: {
          id: item.id,
        },
      });

      return {
        product,
        count: item.count,
      };
    })
  );

  const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    locale: 'pl',
    payment_method_types: ['p24', 'card'],
    success_url:
      'http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/checkout/cancel',
    line_items: products.map((product) => {
      const { id, name, price, images } = product.product.data.product!;

      return {
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 99,
        },
        price_data: {
          currency: 'pln',
          unit_amount: price,
          product_data: {
            name,
            images: images.map((image) => image.url),
            metadata: {
              id,
            },
          },
        },
        quantity: product.count,
      };
    }),
  });

  res.status(201).json({ session: stripeCheckoutSession });
};

export default checkoutHandler;
