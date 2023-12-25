import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://plantoplatetest.lm.r.appspot.com",
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

        getOwn: builder.query({
            query: () => "/api/recipes/owned",
        }),

        getAll: builder.query({
            query: () => "/api/recipes",
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

        addInFavorite: builder.mutation({
            query: (recipeId) => ({
                url: `/api/recipes/selected/${recipeId}`,
                method: "PUT",
            }),
        }),

        removeFromFavorite: builder.mutation({
            query: (recipeId) => ({
                url: `/api/recipes/selected/${recipeId}`,
                method: "DELETE",
            }),
        }),

        getDetails: builder.mutation({
            query: (recipeId) => ({
                url: `/api/recipes/${recipeId}`,
                method: "GET",
            }),
        }),

        getCategories: builder.query({
            query: () => "/api/recipe-categories",
        }),


        getAllProducts: builder.query({
            query: () => "/api/products?type=all",
        }),

        createRecipe: builder.mutation({
            query: (recipeData) => ({
                url: "/api/recipes",
                method: "POST",
                body: recipeData,
            }),
        }),

        getMyRecipes: builder.query({
            query: () => "/api/recipes/owned",
        }),

        deleteRecipe: builder.mutation({
            query: (recipeId) => ({
                url: `/api/recipes/${recipeId}`,
                method: "DELETE",
            }),
        }),

    }),
});

export const {
    useGetAllQuery,
    useGetFavoriteQuery,
    useSigninMutation,
    useAddInFavoriteMutation,
    useGetDetailsMutation,
    useGetCategoriesQuery,
    useGetAllProductsQuery,
    useRemoveFromFavoriteMutation,
    useCreateRecipeMutation,
    useGetMyRecipesQuery,
    useDeleteRecipeMutation,
    useGetOwnQuery
} = api;
