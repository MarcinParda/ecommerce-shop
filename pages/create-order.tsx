import { yupResolver } from '@hookform/resolvers/yup';
import { CartContent } from 'components/CartContent';
import { useCartState } from 'components/Header/Cart/CartContext';
import { Input } from 'components/Input';
import { FormValues, OrderFormValues } from 'interfaces';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { orderFormSchema } from 'schemas/orderForm';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

const stripePromise = loadStripe(
  'pk_test_51MVHC7GX1kD68NcMaRFSBa1srwKQHzoPILxyxD0OK7nWEaI5BFvogKcx2N7l7rgRfa1cPKZMJLL5EK73oZ9Ne5Ve00PTaKZDzo'
);

const OrderForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(orderFormSchema),
  });

  const pay = async (data: OrderFormValues) => {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe not loaded');
    if (!items) throw new Error('No items in cart');

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        items.map((item) => {
          return {
            id: item.id,
            count: item.count,
          };
        })
      ),
    });
    const { session }: { session: Stripe.Response<Stripe.Checkout.Session> } =
      await res.json();

    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  const { items, clearCart } = useCartState();

  const fullAmount = useMemo(
    () => items?.reduce((acc, item) => acc + item.price * item.count, 0) || 0,
    [items]
  );

  const onSubmit = async (data: OrderFormValues) => {};

  return (
    <div>
      <h1>Formularz zamówienia</h1>

      <form onSubmit={handleSubmit(pay)}>
        <Input
          name="email"
          label="Email"
          type="text"
          placeholder="wpisz email..."
          register={register}
          errorMessage={errors.email?.message}
        />
        <div>
          Kwota do zapłacenia: <span className="font-bold">{fullAmount}$</span>
        </div>
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Stwórz zamówienie
        </button>
      </form>
    </div>
  );
};

const CartPage = () => {
  return (
    <div className="max-w-4xl mx-auto w-full p-4">
      <div className="grid grid-cols-2 gap-8">
        <OrderForm />
        <CartContent />
      </div>
    </div>
  );
};

export default CartPage;
