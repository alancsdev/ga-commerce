import { Typography } from '@material-tailwind/react';
import Product from '../../components/Product';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <div className="custom-container-center">
          <Loader />
        </div>
      ) : error ? (
        <Message variant={'error'}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex justify-center h-full">
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
      )}
    </>
  );
}

export default HomePage;
