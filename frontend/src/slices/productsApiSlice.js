import { PRODUCTS_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

// Injecting endpoints into the parent slice
const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a query to fetch all products
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5,
    }),
    // Define a query to fetch details of a specific product by ID
    getProductDetails: builder.query({
      query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}` }),
      keepUnusedDataFor: 5,
    }),
    // Define a query to create a product
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
        body: { ...data },
      }),
      // To stop being cached so we can have fresh data
      invalidatesTags: ['Product'],
    }),
    // Define a query to update a product
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      // To stop being cached so we can have fresh data
      invalidatesTags: ['Products'],
    }),
    // Define a query upload a image to the product
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    // Define a query delete a product
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    // Create a review
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    // Delete a review
    deleteReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = productsApiSlice;
