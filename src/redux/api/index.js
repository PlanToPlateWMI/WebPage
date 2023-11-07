import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://plantoplate.lm.r.appspot.com",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getFavorite: builder.query({
            query: () => "/api/recipes/selected",
        }),

        signin: builder.mutation({
            query: (formData) => ({
                url: "/api/auth/signin",
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});

export const { useGetFavoriteQuery, useSigninMutation } = api;
