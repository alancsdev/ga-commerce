import { useEffect, useState } from 'react';
import { Stepper, Step, Typography } from '@material-tailwind/react';
import { MdLocalShipping, MdPayment, MdShoppingCart } from 'react-icons/md';

const CheckoutSteps = ({ step }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (step) setActiveStep(step);
  }, [step]);

  const steps = [
    {
      icon: <MdLocalShipping className="h-5 w-5" />,
      title: 'Step 1',
      description: 'Address',
    },
    {
      icon: <MdPayment className="h-5 w-5" />,
      title: 'Step 2',
      description: 'Payment',
    },
    {
      icon: <MdShoppingCart className="h-5 w-5" />,
      title: 'Step 3',
      description: 'Checkout',
    },
  ];

  return (
    <div className="w-full px-5 md:px-5 lg:px-10 pb-20">
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            {step.icon}
            <div className="absolute -bottom-[4.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === index ? 'blue-gray' : 'gray'}
                className="dark:text-white"
              >
                {step.title}
              </Typography>
              <Typography
                color={activeStep === index ? 'blue-gray' : 'gray'}
                className="font-normal dark:text-white"
              >
                {step.description}
              </Typography>
            </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;
