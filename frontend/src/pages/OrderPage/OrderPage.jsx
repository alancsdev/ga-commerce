import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrderDetailsQuery } from '../../slices/ordersApiSlice';
import {
  Typography,
  Button,
  List,
  ListItem,
  Card,
  Option,
  Select,
} from '@material-tailwind/react';

const OrderPage = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  console.log(order);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full custom-container-center-placeorder items-center">
          <div className="mx-4 md:mx-10 xl:mx-10 w-full 2xl:max-w-7xl">
            <div className="flex justify-center w-full">
              <div className="w-full mx-0 md:mx-10 bk1:max-w-7xl flex flex-col justify-center items-center">
                <Loader size={176} />
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <Message variant={'error'}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div className="flex w-full custom-container-center-placeorder justify-center">
            <div className="mx-4 md:mx-10 xl:mx-10 w-full 2xl:max-w-7xl">
              <div className="flex justify-center w-full">
                <div className="w-full mx-0 md:mx-10 bk1:max-w-7xl flex flex-col justify-center items-center">
                  <div className="flex flex-col lg:flex-row gap-4 w-full">
                    <div className="flex w-full lg:w-2/3">
                      <Card className="w-full border-4 shadow-lg dark:bg-gray-700 dark:border-gray-800">
                        <Typography
                          variant={'h2'}
                          className="mt-4 self-center text-xl md:text-2xl lg:text-3xl mb-2 dark:text-white"
                        >
                          Order Details: {order._id}
                        </Typography>
                        <List>
                          {order.orderItems.map((item, index) => (
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
                              {index !== order.orderItems.length - 1 && (
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
                            Address: {order.shippingAddress.address}
                          </Typography>
                          <hr />
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 text-black dark:text-white"
                          >
                            City: {order.shippingAddress.city}
                          </Typography>
                          <hr />
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 text-black dark:text-white"
                          >
                            Postal Code: {order.shippingAddress.postalCode}
                          </Typography>
                          <hr />
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 text-black dark:text-white"
                          >
                            Country: {order.shippingAddress.country}
                          </Typography>
                          <hr />
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 dark:text-white"
                          >
                            {order.isDelivered ? (
                              <Message variant={'info'}>Delivered</Message>
                            ) : (
                              <Message variant={'error'}>Not Delivered</Message>
                            )}
                          </Typography>
                        </div>
                      </Card>
                      <Card className="w-full p-4 border-4 shadow-lg dark:bg-gray-700 dark:border-gray-800">
                        <div className="">
                          {/* Total number of items */}
                          <Typography
                            variant={'h3'}
                            className="text-black dark:text-white"
                          >
                            {order.orderItems.reduce(
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
                            Total $ {order.itemsPrice}
                          </Typography>
                          <hr />
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 text-black dark:text-white"
                          >
                            Shipping Price: $ {order.shippingPrice}
                          </Typography>
                          <hr />
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 text-black dark:text-white"
                          >
                            Tax Price: $ {order.taxPrice}
                          </Typography>
                          <hr />
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 text-black dark:text-white"
                          >
                            Total Price: $ {order.totalPrice}
                          </Typography>
                          <hr />
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 dark:text-white"
                          >
                            {order.isPaid ? (
                              <Message variant={'info'}>Paid</Message>
                            ) : (
                              <Message variant={'error'}>Not Paid</Message>
                            )}
                          </Typography>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderPage;
