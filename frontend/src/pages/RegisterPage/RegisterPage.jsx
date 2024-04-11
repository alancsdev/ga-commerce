import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Method register from the usersApiSlice
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // search: '?redirect=/shipping'
  const { search } = useLocation();
  // redirect: /shipping
  const sp = new URLSearchParams(search);
  // Checks if there is a search parameter called 'redirect'.
  // If it exists, redirect will be set to the value of this parameter.
  //Otherwise, redirect will be set to '/', which is the default route.
  // In this case if sp.get has redirect then the variable redirect will be assign as /shipping
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        //Unwrap is a redux toolkit function, if don't use unwrap the access will be data:{ object }
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="custom-container-center">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <form onSubmit={submitHandler}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Name"
              size="lg"
              placeholder="Enter your name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email"
              size="lg"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              size="lg"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm Password"
              size="lg"
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>{' '}
            <Button
              type="submit"
              variant="gradient"
              fullWidth
              disabled={
                !email || !email.includes('@') || !password || isLoading
              }
              onClick={(e) => submitHandler(e)}
            >
              Register
            </Button>
            <div className="self-center">{isLoading && <Loader />}</div>
          </CardBody>
        </form>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="font-bold ml-2"
            >
              Sign In
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
