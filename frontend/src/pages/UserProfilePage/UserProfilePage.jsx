import { useState } from 'react';
import UserProfile from '../../components/UserProfile';
import Orders from '../../components/Orders';
import { Card, Button } from '@material-tailwind/react';

const UserProfilePage = () => {
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
      <div className="mx-2 flex justify-center h-full">
        <div className="mx-4 md:mx-10 xl:mx-10 w-full h-full 2xl:max-w-[1700px] flex flex-col lg:flex-row justify-center gap-1">
          <Card className="lg:w-[20%] h-full overflow-hidden border-x-2 border-t-2 border-b-4 shadow-lg flex gap-1 flex-row lg:flex-col dark:bg-gray-700 dark:border-gray-800">
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
              Profile
            </Button>
          </Card>

          {userSelection ? (
            <Card className="lg:w-[80%] p-8 h-full border-x-2 border-t-2 border-b-4 shadow-lg flex items-center dark:bg-gray-700 dark:border-gray-800">
              <UserProfile />
            </Card>
          ) : (
            <Card className="lg:w-[80%] h-full border-x-2 border-t-2 border-b-4 shadow-lg flex items-center dark:bg-gray-700 dark:border-gray-800">
              <Orders />
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
