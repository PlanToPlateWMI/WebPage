// eslint-disable-next-line
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from '../../app/store';
import { api } from "../api/index.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    favorites: [],
    recipes: [],
    selectedRecipe: [],
    isModalOpen: false,
    categories: [],
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
        setStateDialog(state, { payload }) {
            state.isModalOpen = payload;
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
                api.endpoints.addInFavorite.matchRejected,
                (state, { payload, error }) => {
                    if (!payload) {
                        console.error("Error", error);
                    } else {
                        console.error("Error", payload);
                        if (payload.status === 400) {
                            console.error("Error 400", payload.data);
                        }
                    }
                }
            );
    },
});

export const { setStateDialog } = authSlice.actions;
export default authSlice.reducer;
