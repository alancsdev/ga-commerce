import { Alert } from '@material-tailwind/react';
import { MdErrorOutline } from 'react-icons/md';
import { FaInfoCircle } from 'react-icons/fa';

const Message = ({ variant, children }) => {
  const { color, icon } =
    variant === 'error'
      ? { color: 'red', icon: <MdErrorOutline /> }
      : { color: 'blue', icon: <FaInfoCircle /> };

  return (
    <Alert color={color} icon={icon} className="items-center">
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
