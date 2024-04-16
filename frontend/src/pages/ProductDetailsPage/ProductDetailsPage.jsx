import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import Rating from '../../components/Rating';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Reviews from '../../components/Reviews';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../../slices/productsApiSlice';
import { addToCart } from '../../slices/cartSlice';
import { Button, Typography } from '@material-tailwind/react';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const { id: productId } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: isLoadingCreateReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success('Review submitted');
      setRating(5);
      setComment('');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center h-full custom-container-center">
          <div className="mx-4 md:mx-10 xl:mx-10 2xl:max-w-7xl h-full">
            <div className="flex h-10 justify-center">
              <Link to="/">
                <Button className="">Go Back</Button>
              </Link>
            </div>
            <div className="h-full -mt-10 flex items-center justify-center">
              <Loader size={176} />
            </div>
          </div>
        </div>
      ) : error ? (
        <Message variant={'error'}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex justify-center h-full">
          <div className="mx-4 md:mx-10 xl:mx-10 2xl:max-w-[1700px] h-full">
            <div className="flex h-10 justify-end">
              <Link to="/">
                <Button className="">Go Back</Button>
              </Link>
            </div>
            <div className="min-h-56">
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
                    className="flex items-center justify-center gap-3 w-full mt-4 dark:!bg-none dark:bg-black dark:text-white"
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
                className="font-bold text-xl dark:text-white"
              >
                Description:
              </Typography>
              <Typography
                variant="paragraph"
                className="font-normal text-xl dark:text-white"
              >
                {product.description}
              </Typography>

              <Reviews
                userInfo={userInfo}
                product={product}
                submitHandler={submitHandler}
                isLoadingCreateReview={isLoadingCreateReview}
                rating={rating}
                setRating={setRating}
                setComment={setComment}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsPage;
