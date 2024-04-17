import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from './Rating';
import Message from './Message';
import Loader from './Loader';
import { useDeleteReviewMutation } from '../slices/productsApiSlice';
import { FaTrash } from 'react-icons/fa';
import { Card, Button, Typography, Textarea } from '@material-tailwind/react';
import { toast } from 'react-toastify';

const Reviews = ({
  userInfo,
  product,
  isLoadingCreateReview,
  submitHandler,
  rating,
  comment,
  setRating,
  setComment,
  refetch,
}) => {
  const { id: productId } = useParams();

  const [deleteReview, { isLoading: isLoadingDeleteReview }] =
    useDeleteReviewMutation();

  const [deletingReviewId, setDeletingReviewId] = useState(null);

  const deleteReviewHandler = async (review) => {
    const { _id: reviewId } = review;

    setDeletingReviewId(reviewId);

    try {
      const res = await deleteReview({ productId, reviewId }).unwrap();
      toast.success(res.message);
      refetch();
      setDeletingReviewId(null);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
      setDeletingReviewId(null);
    }
  };

  return (
    <>
      {userInfo && (
        <>
          <Card className="mt-4 flex items-center p-2 bg-gray-100 dark:bg-black">
            <Typography
              variant="paragraph"
              className="font-bold text-xl dark:text-white"
            >
              Write a review
            </Typography>
          </Card>
          <form onSubmit={submitHandler} className="mt-2">
            <div className="select-container">
              <select
                label="Rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="custom-select-product-details"
              >
                <option value={1}>1- Poor</option>
                <option value={2}>2- Fair</option>
                <option value={3}>3 - Good</option>
                <option value={4}>4 - Very Good</option>
                <option value={5}>5 - Excellent</option>
              </select>
              <div className="select-arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-gray-400 dark:text-black"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12l-6-6h12l-6 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <Typography
              variant="h3"
              className="font-bold text-xl dark:text-white mt-2 ml-1"
            >
              Comment:
            </Typography>
            <Textarea
              variant="outlined"
              label="Write your comment here"
              className="text-lg dark:text-white custom-textarea-label"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button disabled={isLoadingCreateReview} type="submit">
              Submit
            </Button>
          </form>
        </>
      )}
      <Card className="mt-4 flex items-center p-2 bg-gray-100 dark:bg-black">
        <Typography
          variant="paragraph"
          className="font-bold text-xl dark:text-white"
        >
          Reviews
        </Typography>
      </Card>
      {product.reviews.length === 0 && (
        <Typography
          variant="paragraph"
          className="font-normal text-xl dark:text-white mt-2 ml-1"
        >
          No Reviews
        </Typography>
      )}
      {isLoadingCreateReview && (
        <div className="flex justify-center my-2">
          <Loader size={44} />
        </div>
      )}

      {product.reviews.map((review) => (
        <Card
          key={review._id}
          className="mt-2 dark:bg-gray-700 pl-6 pr-2 py-2 flex flex-row"
        >
          <div className="w-[80%] lg:w-[90%]">
            <Typography variant="h4" className="dark:text-white">
              {review.name}
            </Typography>
            <Rating value={review.rating} />
            <Typography variant="paragraph" className="dark:text-white">
              {review.createdAt.substring(0, 10)}
            </Typography>
            <Typography variant="paragraph" className="dark:text-white">
              {review.comment}
            </Typography>
          </div>
          <div className="w-[20%] lg:w-[10%] flex flex-col items-end">
            {(userInfo?.isAdmin ||
              (userInfo?._id === review.user && !userInfo?.isAdmin)) && (
              <>
                <Button
                  className="w-8 h-9 flex flex-col items-center"
                  onClick={() => deleteReviewHandler(review)}
                  disabled={deletingReviewId === review._id}
                >
                  <FaTrash className="w-3 h-3" />
                </Button>
                {deletingReviewId === review._id && (
                  <div className="mt-2">
                    <Loader size={44} />
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      ))}

      {!userInfo && (
        <div className="mt-2">
          <Message variant={'info'}>
            Please <Link to="/login">sign in</Link> to write a review{' '}
          </Message>
        </div>
      )}
    </>
  );
};

export default Reviews;
