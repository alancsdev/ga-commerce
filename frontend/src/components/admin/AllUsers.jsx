import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader';
import Message from '../Message';
import Pagination from '../Pagination';
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice';
import {
  Button,
  Card,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogHeader,
  DialogFooter,
  Chip,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TABLE_HEAD = ['ID', 'NAME', 'EMAIL', 'LEVEL', ''];

const AllUsers = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetAllUsersQuery({
    pageNumber,
  });

  const [deleteUser, { isLoading: isLoadingDeleteUser }] =
    useDeleteUserMutation();

  const deleteHandler = async (user) => {
    setUserToDelete(user);
    setOpenDialog(true);
  };

  const confirmDeleteHandler = async () => {
    try {
      await deleteUser(userToDelete._id);
      refetch();
      setOpenDialog(false);
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
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
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogHeader>
                Are you sure you want to delete the product {userToDelete?.name}
                ?
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
              {isLoadingDeleteUser && (
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
                {data.users.map((user, index) => {
                  const isLast = index === data.users.length - 1;
                  const classes = isLast
                    ? 'p-3'
                    : 'p-3 border-b border-blue-gray-50';

                  return (
                    <tr key={user._id}>
                      <td className={`${classes} max-w-[200px]`}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold dark:text-white"
                          >
                            {user._id}
                          </Typography>
                        </div>
                      </td>
                      <td className={`${classes} max-w-[100px]`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold dark:text-white"
                        >
                          {user.name}
                        </Typography>
                      </td>
                      <td className={`${classes} max-w-[200px]`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold dark:text-white"
                        >
                          <Link to={`mailto:${user.email}`}>{user.email}</Link>
                        </Typography>
                      </td>
                      <td className={`${classes} max-w-[150px]`}>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="font-bold dark:text-white"
                        >
                          <Chip
                            size="sm"
                            variant="filled"
                            value={user.isAdmin ? 'Admin' : 'Normal User'}
                            color={user.isAdmin ? 'green' : 'blue'}
                          />
                        </Typography>
                      </td>
                      <td className={`${classes} max-w-[80px]`}>
                        <div className="flex items-center justify-center">
                          <Link to={`/admin/user/${user._id}/edit`}>
                            <Tooltip content="Edit user">
                              <IconButton variant="text">
                                <FaEdit className="h-4 w-4 dark:text-white" />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip content="Delete">
                            <IconButton
                              variant="text"
                              onClick={() => deleteHandler(user)}
                            >
                              <FaTrash className="h-4 w-4 dark:text-white" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="my-2 w-full">
              <Pagination page={data.page} pages={data.pages} isAdmin />
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default AllUsers;
