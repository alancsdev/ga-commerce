import { Fragment, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from '../../slices/ordersApiSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import moment from 'moment';
import {
  Button,
  Typography,
  List,
  ListItem,
  Card,
} from '@material-tailwind/react';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: isLoadingDeliver }] =
    useDeliverOrderMutation();

  const {
    data: paypal,
    isLoading: isLoadingGetPayPalClientId,
    error: errorGetPayPalClientId,
  } = useGetPayPalClientIdQuery();

  const [payOrder, { isLoading: isLoadingPayOrder }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (
      !errorGetPayPalClientId &&
      !isLoadingGetPayPalClientId &&
      paypal.clientId
    ) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [
    errorGetPayPalClientId,
    isLoadingGetPayPalClientId,
    order,
    paypal,
    paypalDispatch,
  ]);

  const myOrdersHandle = () => {
    navigate('/profile');
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successful');
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  };
  // const onApproveTest = async () => {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();
  //   toast.success('Payment successful');
  // };
  const onError = (error) => {
    toast.error(error.message);
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order delivered');
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex w-full custom-container-center-placeorder justify-center items-center">
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
                  <div className="w-full text-end mr-4">
                    <Button onClick={myOrdersHandle}>My Orders</Button>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4 w-full">
                    <div className="flex w-full lg:w-2/3">
                      <Card className="w-full border-4 shadow-lg dark:bg-gray-700 dark:border-gray-800">
                        <Typography
                          variant={'h2'}
                          className="p-4 self-center text-xl md:text-2xl lg:text-3xl mb-2 dark:text-white"
                        >
                          Order ID: {order._id}
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
                          {/* Total number of items */}
                          <Typography
                            variant={'h3'}
                            className="text-black dark:text-white"
                          >
                            {order.orderItems.reduce(
                              (acc, item) => acc + item.quantity,
                              0
                            )}{' '}
                            {order.orderItems.reduce(
                              (acc, item) => acc + item.quantity,
                              0
                            ) === 1
                              ? 'item'
                              : 'items'}
                          </Typography>
                          <hr />
                          {/* Prices */}
                          <Typography
                            variant={'paragraph'}
                            className="text-xl p-1 text-black dark:text-white"
                          >
                            Total $ {order.itemsPrice.toFixed(2)}
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
                          <div className="mt-3">
                            {order.isPaid ? (
                              <Message variant={'info'}>
                                Paid on{' '}
                                {moment(order.paidAt).format(
                                  'DD/MM/YYYY HH:mm A'
                                )}
                              </Message>
                            ) : (
                              <Message variant={'error'}>Not Paid</Message>
                            )}
                          </div>
                          {!order.isPaid && (
                            <div className="flex flex-col items-center mt-2">
                              {isLoadingPayOrder && <Loader size={44} />}
                              {isPending ? (
                                <Loader size={44} />
                              ) : (
                                <div className="w-full">
                                  {/* <Button onClick={onApproveTest}>
                                    Test Pay Order
                                  </Button> */}
                                  <div>
                                    <PayPalButtons
                                      createOrder={createOrder}
                                      onApprove={onApprove}
                                      onError={onError}
                                    ></PayPalButtons>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </Card>
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
                          <div className="mt-3">
                            {order.isDelivered ? (
                              <Message variant={'info'}>
                                Delivered on{' '}
                                {moment(order.deliveredAt).format(
                                  'DD/MM/YYYY HH:mm A'
                                )}
                              </Message>
                            ) : (
                              <Message variant={'error'}>Not Delivered</Message>
                            )}
                          </div>

                          {userInfo &&
                            userInfo.isAdmin &&
                            order.isPaid &&
                            !order.isDelivered && (
                              <Button
                                fullWidth
                                onClick={deliverOrderHandler}
                                className="mt-2"
                              >
                                Mark as delivered
                              </Button>
                            )}

                          {isLoadingDeliver && (
                            <div className="flex justify-center items-center mt-2">
                              <Loader size={44} />
                            </div>
                          )}
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
