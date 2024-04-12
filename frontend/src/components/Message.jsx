import { Alert } from '@material-tailwind/react';
import { MdErrorOutline } from 'react-icons/md';
import { FaInfoCircle } from 'react-icons/fa';

const Message = ({ variant, children }) => {
  // Determine color and icon based on the variant prop
  const { color, icon } =
    variant === 'error'
      ? { color: 'red', icon: <MdErrorOutline /> }
      : { color: 'blue', icon: <FaInfoCircle /> };

  return (
    // Display an alert with specified color and icon
    <Alert
      color={color}
      icon={icon}
      className="items-center custom-margin-message "
    >
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
