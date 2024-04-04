import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

// Injecting endpoints into the parent slice
const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a query to fetch all products
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      keepUnusedDataFor: 5,
    }),
    // Define a query to fetch details of a specific product by ID
    getProductDetails: builder.query({
      query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}` }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
