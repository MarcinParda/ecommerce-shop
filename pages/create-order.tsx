import { TrashIcon } from '@heroicons/react/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { CartContent } from 'components/CartContent';
import { useCartState } from 'components/Header/Cart/CartContext';
import { Input } from 'components/Input';
import { OrderFormValues } from 'interfaces';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { orderFormSchema } from 'schemas/orderForm';

const OrderForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<OrderFormValues>({
    resolver: yupResolver(orderFormSchema),
  });

  const { items } = useCartState();

  const fullAmount = useMemo(
    () => items?.reduce((acc, item) => acc + item.price * item.count, 0),
    [items]
  );

  const onSubmit = async (data: OrderFormValues) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <h1>Formularz zamówienia</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="firstName"
          label="Imię"
          type="text"
          placeholder="wpisz imię..."
          register={register}
          errorMessage={errors.firstName?.message}
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
