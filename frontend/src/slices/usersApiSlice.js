import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

// Injecting endpoints into the parent slice
const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a mutation to login
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;
