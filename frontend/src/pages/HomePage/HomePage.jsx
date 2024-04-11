import { Typography } from '@material-tailwind/react';
import Product from '../../components/Product';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import ProductSkeleton from './../../components/ProductSkeleton';
import Message from '../../components/Message';
import { useState, useEffect } from 'react';

function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const [numSkeletons, setNumSkeletons] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 540) {
        setNumSkeletons(1);
      } else if (width < 878) {
        setNumSkeletons(2);
      } else if (width > 878 && width < 1263) {
        setNumSkeletons(4);
      } else if (width > 1262) {
        setNumSkeletons(6);
      } else {
        setNumSkeletons(6);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <div className="flex justify-center flex-wrap mx-4 md:mx-10 xl:mx-10 w-full bk1:max-w-7xl gap-4">
            {Array.from({ length: numSkeletons }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
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
