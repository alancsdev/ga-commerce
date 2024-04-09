import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { Button, Typography } from '@material-tailwind/react';
import Rating from '../../components/Rating';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetProductDetailsQuery } from '../../slices/productsApiSlice';
import { addToCart } from '../../slices/cartSlice';

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);

  const { id: productId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate('/cart');
  };

  return (
    <div className="flex justify-center h-full custom-container-center ">
      <div className="mx-4 md:mx-10 xl:mx-10 2xl:max-w-7xl h-full">
        <div
          className={`flex h-10 ${
            isLoading ? 'justify-center' : 'justify-end'
          }`}
        >
          <Link to="/">
            <Button className="dark:bg-white dark:text-black">Go Back</Button>
          </Link>
        </div>
        {isLoading ? (
          <div className="h-full -mt-10 flex items-center">
            <Loader />
          </div>
        ) : error ? (
          <Message>{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <div className="col">
                <img
                  className="h-96 lg:h-auto w-full rounded-lg object-cover object-center"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="col">
                <Typography variant="h3" className="dark:text-white">
                  {product.name}
                </Typography>

                <hr className="my-2 border-t border-gray-300" />

                <Rating
                  value={product.rating}
                  text={product.numReviews}
                  className={'text-2xl'}
                />

                <hr className="my-2 border-t border-gray-300" />

                <Typography
                  variant="paragraph"
                  className="font-medium text-2xl dark:text-white"
                >
                  Price: $ {product.price.toFixed(2)}
                </Typography>

                <hr className="my-2 border-t border-gray-300" />

                <Typography
                  variant="paragraph"
                  className="font-normal text-2xl inline-block dark:text-white"
                >
                  Status:
                </Typography>

                <Typography
                  variant="paragraph"
                  className="font-medium text-2xl inline-block pl-2"
                  color={product.quantityInStock > 0 ? 'green' : 'red'}
                >
                  {product.quantityInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </Typography>

                <hr className="my-2 border-t border-gray-300" />

                <Button
                  variant="gradient"
                  className="flex items-center justify-center gap-3 w-full mt-4 dark:!bg-none dark:bg-white dark:text-black"
                  disabled={product.quantityInStock === 0}
                  onClick={addToCartHandler}
                >
                  <FaShoppingCart />
                  Add to cart
                </Button>
              </div>
            </div>
            <hr className="my-4 border-t border-gray-300" />

            <Typography
              variant="paragraph"
              className="font-normal text-xl dark:text-white"
            >
              Description: <br />
              {product.description}
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
