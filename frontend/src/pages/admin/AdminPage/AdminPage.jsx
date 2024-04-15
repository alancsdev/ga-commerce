import { useState } from 'react';
import AllOrders from '../../../components/AllOrders';
import AllProducts from '../../../components/AllProducts';
// import AllUsers from '../../../components/AllUsers';
import { Card, Button } from '@material-tailwind/react';

const AdminPage = () => {
  const [selectedComponent, setSelectedComponent] = useState('orders');

  const handleShowComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <>
      <div className="mx-2 flex justify-center h-full">
        <div className="mx-4 md:mx-10 xl:mx-10 w-full h-full 2xl:max-w-[1700px] flex flex-col lg:flex-row justify-center gap-1">
          <Card className="lg:w-[20%] h-full overflow-hidden border-x-2 border-t-2 border-b-4 shadow-lg flex gap-1 flex-row lg:flex-col dark:bg-gray-700 dark:border-gray-800">
            <Button
              className={`w-1/2 lg:w-full rounded-none ${
                selectedComponent === 'orders' ? 'bg-red-500 text-white' : ''
              }`}
              onClick={() => handleShowComponent('orders')}
            >
              Orders
            </Button>
            <Button
              className={`w-1/2 lg:w-full rounded-none ${
                selectedComponent === 'products' ? 'bg-red-500 text-white' : ''
              }`}
              onClick={() => handleShowComponent('products')}
            >
              Products
            </Button>
            <Button
              className={`w-1/2 lg:w-full rounded-none ${
                selectedComponent === 'users' ? 'bg-red-500 text-white' : ''
              }`}
              onClick={() => handleShowComponent('users')}
            >
              Users
            </Button>
          </Card>

          <Card className="lg:w-[80%] h-full border-x-2 border-t-2 border-b-4 shadow-lg flex items-center dark:bg-gray-700 dark:border-gray-800">
            {selectedComponent === 'orders' && <AllOrders />}
            {selectedComponent === 'products' && <AllProducts />}
            {/* {selectedComponent === 'users' && <AllUsers />} */}
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
