import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../../components/Message';
import Loader from '../../../components//Loader';
import {
  useGetUserDetailsAdminQuery,
  useUpdateUserDetailsAdminMutation,
} from '../../../slices/usersApiSlice';
import {
  Card,
  Typography,
  Input,
  Button,
  Radio,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';

const EditUserProfilePage = () => {
  const { id: userId } = useParams();

  // Getting the userData of the database
  const {
    data: user,
    isLoading: isLoadingUserInfo,
    error: errorUserInfo,
    refetch,
  } = useGetUserDetailsAdminQuery(userId);

  const [updateUserDetailsAdmin, { isLoading: isLoadingUpdateProfile }] =
    useUpdateUserDetailsAdminMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isAdmin: false,
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        isAdmin: user.isAdmin || false,
        password: '',
        confirmPassword: '',
        address: user?.shippingAddress?.address || '',
        city: user?.shippingAddress?.city || '',
        postalCode: user?.shippingAddress?.postalCode || '',
        country: user?.shippingAddress?.country || '',
      });
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      isAdmin,
      password,
      confirmPassword,
      address,
      city,
      postalCode,
      country,
    } = formData;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const dataToSend = {
      userId,
      name,
      email,
      isAdmin,
      address,
      city,
      postalCode,
      country,
    };

    if (password.trim() !== '') {
      dataToSend.password = password;
    }

    try {
      //Unwrap is a redux toolkit function, if don't use unwrap the access will be data:{ object }
      await updateUserDetailsAdmin(dataToSend).unwrap();
      refetch();
      toast.success('User updated!');
      navigate('/admin/adminpage');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const backHandler = () => {
    navigate('/admin/adminpage');
  };

  return (
    <>
      {isLoadingUserInfo ? (
        <div className="flex justify-center h-full custom-container-center">
          <div className="mx-4 md:mx-10 xl:mx-10 w-full 2xl:max-w-7xl">
            <div className="h-full -mt-10 flex justify-center">
              <Loader size={176} />
            </div>
          </div>
        </div>
      ) : errorUserInfo ? (
        <Message variant={'error'}>
          {errorUserInfo?.data?.message || errorUserInfo.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="mx-4 md:mx-10 xl:mx-10 w-full 2xl:max-w-7xl">
              <Card className="p-8 border-x-2 border-t-2 border-b-4 shadow-lg flex items-center min-h-[650px] dark:bg-gray-700 dark:border-gray-800">
                <Button className="self-end" onClick={backHandler}>
                  back
                </Button>
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="text-center dark:text-white"
                >
                  User Profile
                </Typography>

                <form onSubmit={submitHandler} className="w-full">
                  <div className="mb-1 flex flex-col gap-3">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3 dark:text-white"
                    >
                      Name
                    </Typography>
                    <Input
                      size="lg"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3 dark:text-white"
                    >
                      Email Address
                    </Typography>
                    <Input
                      size="lg"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3 dark:text-white"
                    >
                      Password
                    </Typography>
                    <Input
                      type="password"
                      placeholder="*************"
                      size="lg"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3 dark:text-white"
                    >
                      Confirm Password
                    </Typography>
                    <Input
                      type="password"
                      placeholder="*************"
                      size="lg"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3 dark:text-white"
                    >
                      Shipping Address
                    </Typography>
                    <Input
                      size="lg"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: e.target.value,
                        })
                      }
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3 dark:text-white"
                    >
                      City
                    </Typography>
                    <Input
                      size="lg"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3 dark:text-white"
                    >
                      Postal Code
                    </Typography>
                    <Input
                      size="lg"
                      pattern="[0-9]*"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          postalCode: e.target.value,
                        })
                      }
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3 dark:text-white"
                    >
                      Country
                    </Typography>
                    <Input
                      size="lg"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          country: e.target.value,
                        })
                      }
                    />{' '}
                    <div className="flex gap-10">
                      <Radio
                        name="type"
                        label={
                          <Typography
                            color="blue-gray"
                            className="font-normal text-blue-gray-400 dark:text-white"
                          >
                            Admin
                          </Typography>
                        }
                        checked={formData.isAdmin}
                        onChange={() =>
                          setFormData({ ...formData, isAdmin: true })
                        }
                      />
                      <Radio
                        name="type"
                        label={
                          <Typography
                            color="blue-gray"
                            className="font-normal text-blue-gray-400 dark:text-white"
                          >
                            Normal User
                          </Typography>
                        }
                        checked={!formData.isAdmin}
                        onChange={() =>
                          setFormData({ ...formData, isAdmin: false })
                        }
                      />
                    </div>
                    <Button className="mt-6" fullWidth type="submit">
                      Update
                    </Button>
                  </div>
                </form>
                <div className="self-center">
                  {isLoadingUpdateProfile && <Loader size={40} />}
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditUserProfilePage;
