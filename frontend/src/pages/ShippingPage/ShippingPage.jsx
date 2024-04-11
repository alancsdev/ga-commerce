import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input, Typography } from '@material-tailwind/react';
import Message from '../../components/Message';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../slices/usersApiSlice';
import { saveShippingAddress } from '../../slices/cartSlice';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const ShippingPage = () => {
  // Getting the userInfo of the store
  const { userInfo } = useSelector((state) => state.auth);

  // Getting the userData of the database
  const {
    data: user,
    isLoading: isLoadingUserInfo,
    error: errorUserInfo,
  } = useGetProfileQuery(userInfo._id);

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    if (user && user.shippingAddress) {
      setFormData({
        address: user.shippingAddress.address || '',
        city: user.shippingAddress.city || '',
        postalCode: user.shippingAddress.postalCode || '',
        country: user.shippingAddress.country || '',
      });
    }
  }, [user]);

  const [updateProfile, { isLoading: isLoadingUpdateProfile }] =
    useUpdateProfileMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.country
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/^\d+$/.test(formData.postalCode)) {
      toast.error('The postal code must contain only numbers');
      return;
    }

    try {
      const { address, city, postalCode, country } = formData;
      //Unwrap is a redux toolkit function, if don't use unwrap the access will be data:{ object }
      const res = await updateProfile({
        address,
        city,
        postalCode,
        country,
      }).unwrap();
      dispatch(saveShippingAddress(formData));
      navigate('/payment');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex justify-center h-full custom-container-center ">
      <div className="mx-4 md:mx-10 xl:mx-10 2xl:max-w-7xl">
        {isLoadingUserInfo ? (
          <div className="h-full -mt-10 flex items-center">
            <Loader />
          </div>
        ) : errorUserInfo ? (
          <Message>
            {errorUserInfo?.data?.message || errorUserInfo.error}
          </Message>
        ) : (
          <Card className="p-8">
            <Typography variant="h4" color="blue-gray">
              Shipping Address
            </Typography>

            <form
              onSubmit={submitHandler}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-3">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Address
                </Typography>
                <Input
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  City
                </Typography>
                <Input
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Postal Code
                </Typography>
                <Input
                  size="lg"
                  pattern="[0-9]*"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Country
                </Typography>
                <Input
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />{' '}
                <Button className="mt-6" fullWidth onClick={submitHandler}>
                  Continue
                </Button>
              </div>
            </form>
            <div className="self-center">
              {isLoadingUpdateProfile && <Loader size={10} />}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ShippingPage;
