import { Typography } from '@material-tailwind/react';
import products from '../../products';
import Product from '../../components/Product';

function HomePage() {
  return (
    <div className="mx-4 md:mx-10 xl:mx-10 2xl:mx-40 bk1:mx-96">
      <Typography variant="h1" className="mx-auto">
        Latest Products
      </Typography>

      <div className="flex flex-wrap gap-4 justify-center sm:justify-center bk1:justify-center">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
