import { Card, Typography, Chip } from '@material-tailwind/react';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import Loader from './Loader';
import Message from './Message';
import { Link } from 'react-router-dom';

const TABLE_HEAD = ['ID', 'DATE', 'TOTAL', 'STATUS'];

const Orders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader size={176} />
        </div>
      ) : error ? (
        <Message variant={'error'}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Card className="h-full w-full dark:bg-gray-700 overflow-x-auto rounded-lg mb-[-1px]">
            <table className="w-full min-w-max table-auto text-left m-0 border-collapse">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 dark:bg-gray-800"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70 dark:text-white"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const isLast = index === orders.length - 1;
                  const classes = isLast
                    ? 'p-3'
                    : 'p-3 border-b border-blue-gray-50';

                  return (
                    <tr key={order._id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold dark:text-white"
                          >
                            {
                              <Link to={`/orders/${order._id}`}>
                                {order._id}
                              </Link>
                            }
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold dark:text-white"
                        >
                          {order.createdAt.substring(0, 10)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold dark:text-white"
                        >
                          $ {order.totalPrice}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="font-bold dark:text-white"
                        >
                          {!order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <Chip
                              size="sm"
                              variant="filled"
                              value={
                                order.isPaid && order.isDelivered
                                  ? 'DELIVERED'
                                  : order.isPaid && !order.isDelivered
                                  ? 'IN TRANSPORT'
                                  : 'PENDING'
                              }
                              color={
                                order.isPaid && order.isDelivered
                                  ? 'green'
                                  : order.isPaid && !order.isDelivered
                                  ? 'blue'
                                  : 'red'
                              }
                            />
                          )}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <IconButton variant="outlined" size="sm">
                1
              </IconButton>
              <IconButton variant="text" size="sm">
                2
              </IconButton>
              <IconButton variant="text" size="sm">
                3
              </IconButton>
              <IconButton variant="text" size="sm">
                ...
              </IconButton>
              <IconButton variant="text" size="sm">
                8
              </IconButton>
              <IconButton variant="text" size="sm">
                9
              </IconButton>
              <IconButton variant="text" size="sm">
                10
              </IconButton>
            </div>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </CardFooter> */}
        </>
      )}
    </>
  );
};

export default Orders;
