import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../../components/Message';
import Loader from '../../../components/Loader';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../../slices/productsApiSlice';
import { Card, Typography, Input, Button } from '@material-tailwind/react';
import { toast } from 'react-toastify';

const EditProductPage = () => {
  const navigate = useNavigate();

  const { id: productId } = useParams();

  const {
    data: product,
    isLoading: isLoadingGetProductDetails,
    error: errorGetProductDetails,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: isLoadingUpdateProduct }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: isLoadingUploadProductImage }] =
    useUploadProductImageMutation();

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    quantityInStock: 0,
    description: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || 0,
        image: product.image || '',
        brand: product.brand || '',
        category: product.category || '',
        quantityInStock: product.quantityInStock || 0,
        description: product.description || '',
      });
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      formData.id = productId;
      await updateProduct(formData);
      refetch();
      toast.success('Product edited!');
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
      setFormData({ ...formData, image: res.image });
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      {isLoadingGetProductDetails ? (
        <div className="flex justify-center h-full custom-container-center">
          <div className="mx-4 md:mx-10 xl:mx-10 w-full 2xl:max-w-7xl">
            <div className="h-full -mt-10 flex justify-center">
              <Loader size={176} />
            </div>
          </div>
        </div>
      ) : errorGetProductDetails ? (
        <Message>
          {errorGetProductDetails?.data?.message ||
            errorGetProductDetails.error}
        </Message>
      ) : (
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
                  Edit Product
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
                    <Input
                      size="lg"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
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
                      Update
                    </Button>
                  </div>
                </form>
                <div className="self-center">
                  {isLoadingUpdateProduct && <Loader size={40} />}
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProductPage;
