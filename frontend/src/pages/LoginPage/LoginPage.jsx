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
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit');
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
              onClick={(e) => submitHandler(e)}
            >
              Sign In
            </Button>
          </CardBody>
        </form>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link to="/register" className="font-bold ml-2">
              Sign up
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
