import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Radio } from '@material-tailwind/react';
import CheckoutSteps from '../../components/CheckoutSteps';
import { savePaymentMethod } from '../../slices/cartSlice';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-full w-full scale-105"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder/');
  };

  return (
    <div className="flex justify-center h-full custom-container-center">
      <div className="mx-4 md:mx-10 xl:mx-10 w-full 2xl:max-w-7xl">
        <Card className="p-8 flex items-center h-[650px] dark:bg-gray-700">
          <CheckoutSteps step={1} />
          <Typography
            variant="h4"
            color="blue-gray"
            className="text-center dark:text-white"
          >
            Payment Method
          </Typography>

          <form
            onSubmit={submitHandler}
            className="mt-8 mb-2 w-full h-full flex flex-col justify-between"
          >
            <Radio
              name="paymentMethod"
              value="PayPal"
              id="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
              defaultChecked
              ripple={false}
              icon={<Icon />}
              className="border-gray-900/80 bg-gray-900/10 dark:bg-white/60 p-0 transition-all hover:before:opacity-0"
              label={
                <Typography
                  color="blue-gray"
                  className="font-normal text-blue-gray-400 dark:text-white"
                >
                  Paypal
                </Typography>
              }
            />
            <Radio
              name="paymentMethod"
              value="CreditCard"
              id="CreditCard"
              onChange={(e) => setPaymentMethod(e.target.value)}
              ripple={false}
              icon={<Icon />}
              disabled
              className="border-gray-900/80 bg-gray-900/10 dark:bg-white/60 p-0 transition-all hover:before:opacity-0"
              label={
                <Typography
                  color="blue-gray"
                  className="font-normal text-blue-gray-400 dark:text-white"
                >
                  Credit Card
                </Typography>
              }
            />
            <Radio
              name="paymentMethod"
              value="DebitCard"
              id="DebitCard"
              onChange={(e) => setPaymentMethod(e.target.value)}
              ripple={false}
              icon={<Icon />}
              disabled
              className="border-gray-900/80 bg-gray-900/10 dark:bg-white/60 p-0 transition-all hover:before:opacity-0"
              label={
                <Typography
                  color="blue-gray"
                  className="font-normal text-blue-gray-400 dark:text-white"
                >
                  Debit Card
                </Typography>
              }
            />
            <Radio
              name="paymentMethod"
              value="ApplePay"
              id="ApplePay"
              onChange={(e) => setPaymentMethod(e.target.value)}
              ripple={false}
              icon={<Icon />}
              disabled
              className="border-gray-900/80 bg-gray-900/10 dark:bg-white/60 p-0 transition-all hover:before:opacity-0"
              label={
                <Typography
                  color="blue-gray"
                  className="font-normal text-blue-gray-400 dark:text-white"
                >
                  Apple Pay
                </Typography>
              }
            />
            <Button type="submit" fullWidth className="">
              Continue
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
