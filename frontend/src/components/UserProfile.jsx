import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import Loader from './Loader';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Typography, Input, Button } from '@material-tailwind/react';
import { toast } from 'react-toastify';

const UserProfile = () => {
  // Getting the userInfo of the store
  const { userInfo } = useSelector((state) => state.auth);

  // Getting the userData of the database
  const {
    data: user,
    isLoading: isLoadingUserInfo,
    error: errorUserInfo,
  } = useGetProfileQuery(userInfo._id);

  const [updateProfile, { isLoading: isLoadingUpdateProfile }] =
    useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        address: user.shippingAddress.address || '',
        city: user.shippingAddress.city || '',
        postalCode: user.shippingAddress.postalCode || '',
        country: user.shippingAddress.country || '',
      });
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
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
      name,
      email,
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
      const res = await updateProfile(dataToSend).unwrap();

      // Removing password to save in the cookie
      const { password, ...rest } = res;
      dispatch(setCredentials({ ...rest }));

      toast.success('User updated!');
      navigate('/profile');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      {isLoadingUserInfo ? (
        <div className="flex justify-center items-center h-full min-h-[650px]">
          <Loader size={176} />
        </div>
      ) : errorUserInfo ? (
        <Message variant={'error'}>
          {errorUserInfo?.data?.message || errorUserInfo.error}
        </Message>
      ) : (
        <>
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
              <Button className="mt-6" fullWidth onClick={submitHandler}>
                Update
              </Button>
            </div>
          </form>
          <div className="self-center">
            {isLoadingUpdateProfile && <Loader size={40} />}
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
