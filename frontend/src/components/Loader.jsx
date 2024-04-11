import { Spinner } from '@material-tailwind/react';

const Loader = ({ size }) => {
  let sizeLoader = 44;
  if (size) sizeLoader = size;

  return <Spinner className={`h-${sizeLoader} w-${sizeLoader}`} color="red" />;
};

export default Loader;
