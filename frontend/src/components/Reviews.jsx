import { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Message from './Message';
import Loader from './Loader';
import { Card, Button, Typography, Textarea } from '@material-tailwind/react';

const Reviews = ({
  userInfo,
  product,
  isLoadingCreateReview,
  submitHandler,
  rating,
  setRating,
  setComment,
}) => {
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
        <Card key={review._id} className="mt-2 dark:bg-gray-700 px-8 py-2">
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
