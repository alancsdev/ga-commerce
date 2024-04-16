import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import Message from '../Message';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import {
  Button,
  Card,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogHeader,
  DialogFooter,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TABLE_HEAD = ['ID', 'NAME', 'PRICE', 'CATEGORY', ''];

const AllProducts = () => {
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [deleteProduct, { isLoading: isLoadingDeleteProduct }] =
    useDeleteProductMutation();

  const deleteHandler = async (product) => {
    setProductToDelete(product);
    setOpenDialog(true);
  };

  const confirmDeleteHandler = async () => {
    try {
      await deleteProduct(productToDelete._id);
      refetch();
      setOpenDialog(false);
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const createProductHandler = () => {
    navigate('/admin/create-product');
  };

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
          <Card className="h-full w-full dark:bg-gray-800 overflow-auto rounded-lg mb-[-1px]">
            <Button
              className="w-52 self-end mb-1"
              onClick={createProductHandler}
            >
              Create Product
            </Button>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogHeader>
                Are you sure you want to delete the product{' '}
                {productToDelete?.name}?
              </DialogHeader>
              <DialogFooter className="flex justify-between">
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setOpenDialog(false)}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={confirmDeleteHandler}
                >
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
              {isLoadingDeleteProduct && (
                <div className="flex justify-center mb-2">
                  <Loader size={44} />
                </div>
              )}
            </Dialog>
            <table className="w-full min-w-max table-auto text-left m-0 border-collapse dark:bg-gray-700">
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
                              <Link to={`/product/${product._id}`}>
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
                      <td className={`${classes} max-w-[80px]`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold dark:text-white"
                        >
                          $ {product.price.toFixed(2)}
                        </Typography>
                      </td>
                      <td className={`${classes} max-w-[100px]`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold dark:text-white"
                        >
                          {product.category}
                        </Typography>
                      </td>
                      <td className={`${classes} max-w-[80px]`}>
                        <div className="flex items-center justify-center">
                          <Link to={`/admin/product/${product._id}/edit`}>
                            <Tooltip content="Edit Product">
                              <IconButton variant="text">
                                <FaEdit className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip content="Delete">
                            <IconButton
                              variant="text"
                              onClick={() => deleteHandler(product)}
                            >
                              <FaTrash className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </div>
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
