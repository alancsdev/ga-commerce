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
    <Card className="w-72 border-x-2 border-t-2 border-b-4 shadow-lg">
      <CardHeader shadow={false} floated={false} className="h-52">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </Link>
      </CardHeader>
      <CardBody className="">
        <div className="mb-2 flex flex-col">
          <Link to={`/product/${product._id}`}>
            <Typography color="black" className="font-bold">
              {product.name}
            </Typography>
          </Link>
          <Typography color="blue-gray" className="font-medium">
            $ {product.price}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0 pb-6">
        <Rating value={product.rating} text={product.numReviews} />
      </CardFooter>
    </Card>
  );
}

export default Product;
