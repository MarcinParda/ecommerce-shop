import { useCartState } from 'components/Header/Cart/CartContext';

const CartPage = () => {
  const cartState = useCartState();
  return (
    <div>
      <ul>
        {cartState.items.map((item, index) => (
          <li key={`${item.title}_${index}`}>
            {item.title} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
