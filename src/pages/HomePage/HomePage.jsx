import { Typography } from '@material-tailwind/react';
import products from '../../products';
import Product from '../../components/Product';

function HomePage() {
  return (
    <>
      <Typography variant="h1" className="mx-auto">
        Latest Products
      </Typography>

      <div className="flex flex-wrap gap-4 justify-center sm:justify-center bk1:justify-normal">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
