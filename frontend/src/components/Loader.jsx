import { Spinner } from '@material-tailwind/react';

const Loader = ({ size }) => {
  return <Spinner style={{ height: size, width: size }} color="red" />;
};

export default Loader;
