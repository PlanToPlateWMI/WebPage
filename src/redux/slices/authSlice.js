import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/index.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem('token');
const storedRole = localStorage.getItem('role');

const initialState = {
    token: storedToken || "",
    favorites: [],
    recipes: [],
    selectedRecipe: [],
    isModalOpen: false,
    isModalAddPrzepisOpen: false,
    categories: [],
    role: storedRole || "",
    
};

export const showPrzepis = createAsyncThunk(
    "auth/showPrzepis",
    async (recipeId, { dispatch, getState }) => {
        const response = await dispatch(
            api.endpoints.getDetails.initiate(recipeId)
        ).unwrap();

        return response;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        openModalAddDialog(state, { payload }) {
            state.isModalAddPrzepisOpen = payload;
        },
        openModalPrzepisDialog(state, { payload }) {
            state.isModalOpen = payload;
        },
        closeDialogs(state, { payload }) {
            state.isModalOpen = payload;
            state.isModalAddPrzepisOpen = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(showPrzepis.fulfilled, (state, action) => {

                state.selectedRecipe = action.payload;
            })
            .addMatcher(
                api.endpoints.signin.matchFulfilled,
                (state, { payload }) => {
                    state.token = payload.token;
                    state.role = payload.role;
                }
            )
            .addMatcher(
                api.endpoints.getFavorite.matchFulfilled,
                (state, { payload }) => {
                    console.log(payload);
                    state.favorites = payload;
                }
            )
            .addMatcher(
                api.endpoints.getAll.matchFulfilled,
                (state, { payload }) => {
                    state.recipes = payload;
                }
            )
            .addMatcher(
                api.endpoints.addInFavorite.matchFulfilled,
                (state, { payload }) => {
                    console.log("Correct", payload);
                }
            )
            .addMatcher(
                api.endpoints.getCategories.matchFulfilled,
                (state, { payload }) => {
                    state.categories = payload;
                }
            )
            .addMatcher(
                api.endpoints.getCategories.matchFulfilled,
                (state, { payload }) => {
                    state.categories = payload;
                }
            )
            .addMatcher(
                api.endpoints.deleteRecipe.matchFulfilled,
                (state, { payload, error }) => {
                    console.log("close");
                    state.isModalOpen = false;
                    state.selectedRecipe = [];
                }
            )
            .addMatcher(
                api.endpoints.createRecipe.matchFulfilled,
                (state, { payload, error }) => {
                    console.log("close");
                    state.isModalAddPrzepisOpen = false;
                }
            );

            //createRecipe
    },
});


export const { closeDialogs, openModalPrzepisDialog, openModalAddDialog } = authSlice.actions;
export default authSlice.reducer;
