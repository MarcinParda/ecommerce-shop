import AppMarkdown from 'components/AppMarkdown';

const Exercise1Page = () => {
  return (
    <>
      <AppMarkdown>[link do produktu wewnętrzny](/product/2)</AppMarkdown>
      <AppMarkdown>
        [link do produktu zewnętrzny
        (localhost)](http://localhost:3000/product/2)
      </AppMarkdown>
      <AppMarkdown>
        [link do produktu zewnętrzny
        (ecommerce-shop-jade.vercel.app)](https://ecommerce-shop-jade.vercel.app/product/2)
      </AppMarkdown>
    </>
  );
};

export default Exercise1Page;
