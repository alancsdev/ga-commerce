import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product({ product }) {
  return (
    <Card className="w-72 border-x-2 border-t-2 border-b-4 shadow-lg dark:bg-gray-500 dark:border-gray-700">
      {/* Card header with product image */}
      <CardHeader shadow={false} floated={false} className="h-52">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </Link>
      </CardHeader>
      {/* Card body with product details */}
      <CardBody className="h-32">
        <div className="mb-2 flex flex-col">
          <Link to={`/product/${product._id}`}>
            <Typography color="black" className="font-bold dark:text-white">
              {product.name}
            </Typography>
          </Link>
          <Typography color="blue-gray" className="font-medium dark:text-white">
            $ {product.price.toFixed(2)}
          </Typography>
        </div>
      </CardBody>
      {/* Card footer with product rating */}
      <CardFooter className="pt-0 pb-6">
        <Rating value={product.rating} text={product.numReviews} />
      </CardFooter>
    </Card>
  );
}

export default Product;
