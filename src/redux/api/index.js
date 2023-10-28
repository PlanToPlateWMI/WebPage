import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from '../../app/store.js';


export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://plantoplate.lm.r.appspot.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState()).authSlice.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  
  endpoints: (builder) => ({

    getToken: builder.query ({
      query: () => '/user/authorize',
    }),

    signin: builder.mutation ({
      query: (formData) => ({
        url: '/api/auth/signin',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
  
});


export const { useSigninMutation } = api;