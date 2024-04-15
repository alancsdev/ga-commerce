import { Link } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import {
  Card,
  Typography,
  Tooltip,
  IconButton,
} from '@material-tailwind/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TABLE_HEAD = ['ID', 'NAME', 'PRICE', 'CATEGORY', '', ''];

const AllProducts = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

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
          <Card className="h-full w-full dark:bg-gray-700 overflow-auto rounded-lg mb-[-1px]">
            <table className="w-full min-w-max table-auto text-left m-0 border-collapse">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
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
                {products.map((product, index) => {
                  const isLast = index === products.length - 1;
                  const classes = isLast
                    ? 'p-3'
                    : 'p-3 border-b border-blue-gray-50';

                  return (
                    <tr key={product._id}>
                      <td className={`${classes} max-w-[200px]`}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold dark:text-white"
                          >
                            {
                              <Link to={`/products/${product._id}`}>
                                {product._id}
                              </Link>
                            }
                          </Typography>
                        </div>
                      </td>
                      <td className={`${classes} max-w-[200px]`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold dark:text-white"
                        >
                          {product.name}
                        </Typography>
                      </td>
                      <td className={`${classes}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold dark:text-white"
                        >
                          $ {product.price.toFixed(2)}
                        </Typography>
                      </td>
                      <td className={`${classes} max-w-[150px]`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold dark:text-white"
                        >
                          {product.category}
                        </Typography>
                      </td>
                      <td className={`${classes} max-w-[20px]`}>
                        <Tooltip content="Edit Product">
                          <IconButton variant="text">
                            <FaEdit className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                      <td className={`${classes} max-w-[20px]`}>
                        <Tooltip content="Delete">
                          <IconButton variant="text">
                            <FaTrash className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </>
  );
};

export default AllProducts;
