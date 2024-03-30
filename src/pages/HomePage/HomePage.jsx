import { Typography } from '@material-tailwind/react';
import products from '../../products';
import Product from '../../components/Product';

function HomePage() {
  return (
    <div className="flex justify-center">
      <div className="mx-4 md:mx-10 xl:mx-10 bk1:max-w-7xl">
        <Typography variant="h1" className="mx-auto">
          Latest Products
        </Typography>

        <div className="flex flex-wrap gap-4 justify-center sm:justify-center bk1:justify-center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
