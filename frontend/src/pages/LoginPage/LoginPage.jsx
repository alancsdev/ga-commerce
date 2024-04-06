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
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Method login from the usersApiSlice
  const [login, { isLoading }] = useLoginMutation();

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
    try {
      //Unwrap is a redux toolkit function, if don't use unwrap the access will be data:{ object }
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
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
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={submitHandler}>
          <CardBody className="flex flex-col gap-4">
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
              Sign In
            </Button>
            <div className="self-center">{isLoading && <Loader />}</div>
          </CardBody>
        </form>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className="font-bold ml-2"
            >
              Sign up
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
