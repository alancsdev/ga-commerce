import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import {
  Card,
  Typography,
  Input,
  Button,
  Textarea,
} from '@material-tailwind/react';

const CreateProductPage = () => {
  const navigate = useNavigate();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [uploadProductImage, { isLoading: isLoadingUploadProductImage }] =
    useUploadProductImageMutation();

  const [formData, setFormData] = useState({
    name: 'Sample name',
    price: 0,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    quantityInStock: 0,
    description: 'Sample description',
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createProduct(formData).unwrap();
      toast.success('Product created!');
      navigate('/admin/adminpage');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const backHandler = () => {
    navigate('/admin/adminpage');
  };

  const uploadFileHandler = async (e) => {
    const form = new FormData();
    form.append('productImage', e.target.files[0]);
    try {
      const res = await uploadProductImage(form).unwrap();
      toast.success(res.message);
      // setFormData({ ...formData, image: res.image }); Code to save locally
      setFormData({ ...formData, image: res.imageUrl });
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="mx-4 md:mx-10 xl:mx-10 w-full 2xl:max-w-7xl">
          <Card className="p-8 border-x-2 border-t-2 border-b-4 shadow-lg flex items-center min-h-[650px] dark:bg-gray-700 dark:border-gray-800">
            <Button className="self-end" onClick={backHandler}>
              back
            </Button>
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-center dark:text-white"
            >
              Create Product
            </Typography>

            <form onSubmit={submitHandler} className="w-full">
              <div className="mb-1 flex flex-col gap-3">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 dark:text-white"
                >
                  Name
                </Typography>
                <Input
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 dark:text-white"
                >
                  Description
                </Typography>
                <Textarea
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 dark:text-white"
                >
                  Price
                </Typography>
                <Input
                  type="number"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 dark:text-white"
                >
                  Image
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white dark:disabled:bg-gray-600"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  value={formData.image}
                  disabled
                />

                <input
                  type="file"
                  className="flex items-center justify-center w-full dark:text-white file:cursor-pointer cursor-pointer"
                  onChange={uploadFileHandler}
                />
                <p className="text-xs text-gray-400 -mt-2">
                  PNG, JPG, JPEG and WEBP are Allowed.
                </p>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 dark:text-white"
                >
                  Category
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 dark:text-white"
                >
                  Brand
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brand: e.target.value,
                    })
                  }
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 dark:text-white"
                >
                  Quantity In Stock
                </Typography>
                <Input
                  type="number"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  value={formData.quantityInStock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantityInStock: e.target.value,
                    })
                  }
                />
                <Button className="mt-6" fullWidth type="submit">
                  Create
                </Button>
              </div>
            </form>
            <div className="self-center">
              {isLoading && <Loader size={40} />}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreateProductPage;
