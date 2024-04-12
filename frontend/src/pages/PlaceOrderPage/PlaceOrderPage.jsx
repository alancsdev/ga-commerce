import { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  Button,
  Typography,
  Card,
  List,
  ListItem,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import { clearCartItems } from '../../slices/cartSlice';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      //Unwrap is a redux toolkit function, if don't use unwrap the access will be data:{ object }
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.ItemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div className="flex w-full custom-container-center-placeorder justify-center items-center">
      <div className="mx-4 md:mx-10 xl:mx-10 w-full 2xl:max-w-7xl">
        <Card className="p-4 md:p-8 border-x-2 border-t-2 border-b-4 shadow-lg flex items-center min-h-[650px] dark:bg-gray-700 dark:border-gray-800">
          <div className="h-[120px] w-full">
            <CheckoutSteps step={2} />
          </div>
          <div className="flex justify-center w-full">
            <div className="w-full mx-0 md:mx-10 bk1:max-w-7xl flex flex-col">
              <Typography
                variant={'h1'}
                className="self-center text-2xl md:text-3xl lg:text-4xl mb-2 dark:text-white"
              >
                Summary
              </Typography>
              {/* Message if cart is empty */}
              {cart.cartItems.length === 0 ? (
                <Message>
                  <div className="flex items-center">
                    You don&apos;t have items in your cart!
                    <Link to="/">
                      <Button className="ml-4">Go Back</Button>
                    </Link>
                  </div>
                </Message>
              ) : (
                <>
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Cart items */}
                    <div className="flex w-full lg:w-2/3">
                      <Card className="w-full border-4 shadow-lg dark:bg-gray-700 dark:border-gray-800">
                        <List>
                          {cart.cartItems.map((item, index) => (
                            <Fragment key={item._id}>
                              <ListItem
                                key={item._id}
                                ripple={false}
                                className="!overflow-visible hover:bg-transparent hover:cursor-default"
                              >
                                {/* Product image and name */}
                                <div className="flex w-2/3 lg:w-3/4 flex-row">
                                  <Link to={`/product/${item._id}`}>
                                    <img
                                      className="max-w-20 rounded-xl"
                                      src={item.image}
                                      alt={item.name}
                                    />
                                  </Link>

                                  <Typography
                                    variant={'paragraph'}
                                    className="pl-4 text-black font-bold dark:text-white"
                                  >
                                    <Link to={`/product/${item._id}`}>
                                      {item.name}
                                    </Link>
                                  </Typography>
                                </div>
                                {/* Quantity selector and remove button */}
                                <div className="h-full flex w-1/3 lg:w-1/4 ">
                                  <div className="w-full text-black">
                                    <Typography
                                      variant={'paragraph'}
                                      className="font-bold dark:text-white h-1/2"
                                    >
                                      ${item.price.toFixed(2)} x {item.quantity}{' '}
                                      = $
                                      {(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                  </div>
                                </div>
                              </ListItem>
                              {index !== cart.cartItems.length - 1 && (
                                <hr className="mx-3 border-gray-500/30 dark:border-white/40" />
                              )}
                            </Fragment>
                          ))}
                        </List>
                      </Card>
                    </div>
                    {/* Cart summary */}
                    <div className="flex flex-col lg:w-1/3 gap-4">
                      <Card className="w-full p-4 border-4 shadow-lg dark:bg-gray-700 dark:border-gray-800">
                        <div className="">
                          {/* Shipping data */}
                          <Typography
                            variant={'h3'}
                            className="text-black dark:text-white"
                          >
                            Shipping
                          </Typography>
                          <hr />
                          {/* Address*/}
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 text-black dark:text-white"
                          >
                            Address: {cart.shippingAddress.address}
                          </Typography>
                          <hr />
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 text-black dark:text-white"
                          >
                            City: {cart.shippingAddress.city}
                          </Typography>
                          <hr />
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 text-black dark:text-white"
                          >
                            Postal Code: {cart.shippingAddress.postalCode}
                          </Typography>
                          <hr />
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 text-black dark:text-white"
                          >
                            Country: {cart.shippingAddress.country}
                          </Typography>
                          <hr />
                        </div>
                      </Card>
                      <Card className="w-full p-4 border-4 shadow-lg dark:bg-gray-700 dark:border-gray-800">
                        <div className="">
                          {/* Total number of items */}
                          <Typography
                            variant={'h3'}
                            className="text-black dark:text-white"
                          >
                            {cart.cartItems.reduce(
                              (acc, item) => acc + item.quantity,
                              0
                            )}{' '}
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
                            Tax Price: $ {cart.taxPrice}
                          </Typography>
                          <hr />
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 text-black dark:text-white"
                          >
                            Total Price: $ {cart.totalPrice}
                          </Typography>
                          <hr />
                        </div>
                        <div className="self-center mt-4 w-full">
                          <Button fullWidth onClick={placeOrderHandler}>
                            Place Order
                          </Button>
                        </div>
                        <div className="flex justify-center mt-4">
                          {isLoading && <Loader size={40} />}
                        </div>
                      </Card>
                    </div>
                  </div>
                  {error && (
                    <Message variant={'error'}>{error?.data?.message}</Message>
                  )}
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
