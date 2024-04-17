import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCarousel from '../../components/ProductCarousel';
import Product from '../../components/Product';
import ProductSkeleton from './../../components/ProductSkeleton';
import Message from '../../components/Message';
import Pagination from '../../components/Pagination';
import Meta from '../../components/Meta';
import { useGetProductsQuery } from '../../slices/productsApiSlice';

const HomePage = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const [numSkeletons, setNumSkeletons] = useState(1);

  useEffect(() => {
    const calculateNumSkeletons = () => {
      const width = window.innerWidth;
      if (width < 540) {
        return 1;
      } else if (width < 878) {
        return 2;
      } else if (width > 878 && width < 1263) {
        return 4;
      } else if (width > 1262) {
        return 6;
      } else {
        return 6;
      }
    };

    setNumSkeletons(calculateNumSkeletons());
  }, []);

  return (
    <>
      <Meta title={'GA Commerce'} />
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
          <div className="mx-4 md:mx-10 xl:mx-10 2xl:max-w-[1700px]">
            {!keyword && (
              <div>
                <ProductCarousel products={data.topProducts} />
              </div>
            )}
            <div className="flex flex-wrap gap-4 justify-center sm:justify-center bk1:justify-center">
              {data.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
            <div className="mt-2">
              <Pagination
                page={data.page}
                pages={data.pages}
                keyword={keyword ? keyword : ''}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
