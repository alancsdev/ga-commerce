import { Link } from 'react-router-dom';
import { Carousel, Typography, Button } from '@material-tailwind/react';

const ProductCarousel = ({ products }) => {
  return (
    <Carousel
      transition={{ duration: 1.5 }}
      autoplay
      loop
      className="rounded-xl mb-2"
    >
      {products.map((product, index) => (
        <div key={product._id} className="relative w-full">
          <img
            src={product.image}
            alt={`image ${index}`}
            className=" w-full object-cover h-[400px]"
          />
          <div className="absolute inset-0 grid w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                {product.name}
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-6 opacity-80 font-bold"
              >
                $ {product.price.toFixed(2)}
              </Typography>
              <div className="flex justify-center gap-2">
                <Link to={`/product/${product._id}`}>
                  <Button size="lg" color="white">
                    Buy Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
