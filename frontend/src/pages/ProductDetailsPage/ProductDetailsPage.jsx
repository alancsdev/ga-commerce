import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { Button, Typography, Select, Option } from '@material-tailwind/react';
import Rating from '../../components/Rating';
import Message from '../../components/Message';
import { useGetProductDetailsQuery } from '../../slices/productsApiSlice';
import { addToCart } from '../../slices/cartSlice';

const ProductDetailsPage = () => {
  const [amount, setAmount] = useState(1);

  const { id: productId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, amount }));
    navigate('/cart');
  };

  return (
    <div className="flex justify-center">
      <div className="mx-4 md:mx-10 xl:mx-10 2xl:max-w-7xl">
        <div className="flex justify-center">
          <Link to="/">
            <Button>Go Back</Button>
          </Link>
        </div>
        {isLoading ? (
          <h2>Loading...</h2>
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
                <Typography variant="h3">{product.name}</Typography>

                <hr className="my-2 border-t border-gray-300" />

                <Rating
                  value={product.rating}
                  text={product.numReviews}
                  className={'text-3xl'}
                />

                <hr className="my-2 border-t border-gray-300" />

                <Typography
                  variant="paragraph"
                  className="font-medium text-2xl"
                >
                  Price: $ {product.price}
                </Typography>

                <hr className="my-2 border-t border-gray-300" />

                <Typography
                  variant="paragraph"
                  className="font-normal text-2xl inline-block"
                >
                  Status:
                </Typography>

                <Typography
                  variant="paragraph"
                  className="font-medium text-2xl inline-block pl-2"
                  color={product.amountInStock > 0 ? 'green' : 'red'}
                >
                  {product.amountInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </Typography>

                <hr className="my-2 border-t border-gray-300" />

                {/* Converting values to string because the component only accepts string */}
                <Select
                  className="text-xl"
                  variant="standard"
                  label="Select amount"
                  value={amount.toString()}
                  onChange={(val) => setAmount(parseInt(val))}
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  disabled={product.amountInStock === 0}
                >
                  {/* Loading the amount of items in stock */}
                  {product.amountInStock &&
                    Array.from(
                      { length: product.amountInStock },
                      (_, index) => (
                        <Option key={index + 1} value={(index + 1).toString()}>
                          {(index + 1).toString()}
                        </Option>
                      )
                    )}
                </Select>

                <Button
                  variant="gradient"
                  className="flex items-center justify-center gap-3 w-full mt-4"
                  disabled={product.amountInStock === 0}
                  onClick={addToCartHandler}
                >
                  <FaShoppingCart />
                  Add to cart
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <Typography variant="paragraph" className="font-normal text-xl">
                {product.description}
              </Typography>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
