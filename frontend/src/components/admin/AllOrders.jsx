import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader';
import Message from '../Message';
import Pagination from '../Pagination';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { Card, Typography, Chip } from '@material-tailwind/react';

const TABLE_HEAD = ['ID', 'USER', 'DATE', 'TOTAL', 'STATUS'];

const Orders = ({ page }) => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetOrdersQuery({
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full min-h-[650px]">
          <Loader size={176} />
        </div>
      ) : error ? (
        <Message variant={'error'}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Card className="h-full w-full dark:bg-gray-800 overflow-x-auto rounded-lg ">
            <table className="w-full min-w-max table-auto text-left m-0 border-collapse dark:bg-gray-700">
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
                {data.orders.map((order, index) => {
                  const isLast = index === data.orders.length - 1;
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
                          {order.user && order.user.name}
                        </Typography>
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
                          <Chip
                            size="sm"
                            variant="filled"
                            value={
                              order.isPaid && order.isDelivered
                                ? 'DELIVERED'
                                : order.isPaid && !order.isDelivered
                                ? 'SHIPPING'
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
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="my-2 w-full">
              <Pagination
                page={page ? page : data.page}
                pages={data.pages}
                isAdmin
              />
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default Orders;
