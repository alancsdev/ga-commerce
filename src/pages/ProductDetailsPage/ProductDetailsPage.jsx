import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Rating from '../../components/Rating';
import products from '../../products';
import {
  Button,
  Card,
  List,
  ListItem,
  Typography,
} from '@material-tailwind/react';
import { FaShoppingCart } from 'react-icons/fa';

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const product = products.find((product) => product._id === productId);
  return (
    <div className="mx-4 md:mx-10 xl:mx-10 2xl:mx-40 bk1:mx-96">
      <Link to="/">
        <Button>Go Back</Button>
      </Link>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="col">
          <img
            className="h-96 w-full rounded-lg object-cover object-center"
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
          <Typography variant="paragraph" className="font-medium text-2xl">
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
            color={product.countInStock > 0 ? 'green' : 'red'}
          >
            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
          </Typography>
          <hr className="my-2 border-t border-gray-300" />
          <div className="flex justify-center">
            <Button
              variant="gradient"
              className="flex items-center gap-3"
              disabled={product.countInStock === 0}
            >
              <FaShoppingCart />
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Typography variant="paragraph" className="font-normal text-xl">
          {product.description}
        </Typography>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
