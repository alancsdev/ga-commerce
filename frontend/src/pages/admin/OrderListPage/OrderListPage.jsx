import { useState } from 'react';
import UserProfile from '../../../components/UserProfile';
import AllOrders from '../../../components/AllOrders';
import { Card, Button } from '@material-tailwind/react';

const OrderListPage = () => {
  const [userSelection, setUserSelection] = useState(false);

  const handleShowComponent = (component) => {
    if (component === 'A') {
      setUserSelection(true);
    } else if (component === 'B') {
      setUserSelection(false);
    }
  };

  return (
    <>
      <div className="mx-2 flex justify-center">
        <div className="mx-4 md:mx-10 xl:mx-10 w-full 2xl:max-w-7xl flex flex-col lg:flex-row justify-center gap-1">
          <Card className="lg:w-[20%] overflow-hidden border-x-2 border-t-2 border-b-4 shadow-lg flex gap-1 flex-row lg:flex-col dark:bg-gray-700 dark:border-gray-800">
            <Button
              className={`w-1/2 lg:w-full rounded-none ${
                !userSelection ? 'bg-red-500 text-white' : ''
              }`}
              onClick={() => handleShowComponent('B')}
            >
              Orders
            </Button>
            <Button
              className={`w-1/2 lg:w-full rounded-none ${
                userSelection ? 'bg-red-500 text-white' : ''
              }`}
              onClick={() => handleShowComponent('A')}
            >
              Users
            </Button>
          </Card>

          {userSelection ? (
            <Card className="lg:w-[80%] p-8 border-x-2 border-t-2 border-b-4 shadow-lg flex items-center min-h-[650px] dark:bg-gray-700 dark:border-gray-800">
              <UserProfile />
            </Card>
          ) : (
            <Card className="lg:w-[80%] border-x-2 border-t-2 border-b-4 shadow-lg flex items-center min-h-[650px] dark:bg-gray-700 dark:border-gray-800">
              <AllOrders />
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderListPage;