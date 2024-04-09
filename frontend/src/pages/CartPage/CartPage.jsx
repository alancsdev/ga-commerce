import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import {
  Typography,
  Button,
  List,
  ListItem,
  Card,
  Option,
  Select,
} from '@material-tailwind/react';
import Message from '../../components/Message';
import { addToCart, removeFromCart } from '../../slices/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select cart state from Redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full mx-4 md:mx-10 bk1:max-w-7xl flex flex-col">
        <Typography
          variant={'h1'}
          className="self-center text-2xl md:text-3xl lg:text-4xl mb-2 dark:text-white"
        >
          Welcome to your cart!
        </Typography>
        {/* Message if cart is empty */}
        {cartItems.length === 0 ? (
          <Message>
            <div className="flex items-center">
              You don&apos;t have items in your cart!
              <Link to="/">
                <Button className="ml-4">Go Back</Button>
              </Link>
            </div>
          </Message>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Cart items */}
            <div className="flex w-full lg:w-2/3">
              <Card className="w-full border-4 shadow-lg dark:bg-gray-600 dark:border-gray-700">
                <List className="">
                  {cartItems.map((item) => (
                    <ListItem
                      key={item._id}
                      ripple={false}
                      className="!overflow-visible hover:bg-transparent hover:cursor-default"
                    >
                      {/* Product image and name */}
                      <div className="flex w-2/3 lg:w-3/4 flex-row">
                        <Link to={`/product/${item._id}`}>
                          <img
                            className="w-24 rounded-xl"
                            src={item.image}
                            alt={item.name}
                          />
                        </Link>

                        <Typography
                          variant={'paragraph'}
                          className="pl-4 text-black font-bold dark:text-white"
                        >
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Typography>
                      </div>
                      {/* Quantity selector and remove button */}
                      <div className="h-full flex w-1/3 lg:w-1/4 ">
                        <div className="w-3/4 text-black custom-limit-width">
                          <Typography
                            variant={'paragraph'}
                            className="dark:text-white h-1/2"
                          >
                            $ {item.price.toFixed(2)}
                          </Typography>
                          <Select
                            className="text-xl dark:text-white dark:border-white light:my-custom-style dark:my-custom-style"
                            variant="standard"
                            label="Select quantity"
                            value={item.quantity.toString()}
                            onChange={(e) => addToCartHandler(item, Number(e))}
                            animate={{
                              mount: { y: 0 },
                              unmount: { y: 25 },
                            }}
                          >
                            {/* Loading the quantity of items in stock limiting in 10*/}
                            {Array.from(
                              { length: Math.min(item.quantityInStock, 10) },
                              (_, index) => (
                                <Option
                                  className=""
                                  key={index + 1}
                                  value={(index + 1).toString()}
                                >
                                  {(index + 1).toString()}
                                </Option>
                              )
                            )}
                          </Select>
                        </div>
                        <div className="w-1/4 flex items-center justify-center">
                          <Button
                            size="sm"
                            className="w-8 h-8 flex flex-col items-center"
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            <FaTrash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </div>
            {/* Cart summary */}
            <div className="flex lg:w-1/3 max-h-[280px]">
              <Card className="w-full p-4 border-4 shadow-lg dark:bg-gray-600 dark:border-gray-700">
                <div className="">
                  {/* Total number of items */}
                  <Typography
                    variant={'h3'}
                    className="text-black dark:text-white"
                  >
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                    items
                  </Typography>
                  <hr />
                  {/* Prices */}
                  <Typography
                    variant={'paragraph'}
                    className="text-xl p-1 text-black dark:text-white"
                  >
                    Total $ {cart.itemsPrice}
                  </Typography>
                  <hr />
                  <Typography
                    variant={'paragraph'}
                    className="text-xl p-1 text-black dark:text-white"
                  >
                    Shipping Price: $ {cart.shippingPrice}
                  </Typography>
                  <hr />
                  <Typography
                    variant={'paragraph'}
                    className="text-xl p-1 text-black dark:text-white"
                  >
                    Tax Price: $ {cart.taxPrice.toFixed(2)}
                  </Typography>
                  <hr />
                  <Typography
                    variant={'paragraph'}
                    className="text-xl p-1 text-black dark:text-white"
                  >
                    Total Price: $ {cart.totalPrice.toFixed(2)}
                  </Typography>
                  <hr />
                </div>
                <div className="self-center mt-4">
                  <Button
                    onClick={checkoutHandler}
                    className="dark:bg-white dark:text-black"
                  >
                    Proceed To Checkout
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
