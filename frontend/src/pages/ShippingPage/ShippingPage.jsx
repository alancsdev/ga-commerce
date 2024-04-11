import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../../slices/cartSlice';
import { Button, Typography } from '@material-tailwind/react';
import Message from '../../components/Message';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [formData, setFormData] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    navigate('/payment');
  };

  return (
    <div className="flex justify-center h-full custom-container-center ">
      <div className="mx-4 md:mx-10 xl:mx-10 2xl:max-w-7xl h-full"></div>
    </div>
  );
};

export default ShippingPage;
