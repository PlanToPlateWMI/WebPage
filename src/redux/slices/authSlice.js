// eslint-disable-next-line
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../app/store';
import { api } from '../api/index.js';

const initialState = {
  token: "",
  favorites: [],
  recipes: []
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    activatePromo(state, { payload }) {
      
    },
  },
  extraReducers: (builder) => {
    builder
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
        console.log(payload);
      }
    )
    .addMatcher(
      api.endpoints.addInFavorite.matchFulfilled,
      (state, { payload }) => {
        console.log('Correct', payload);
      }
    )
    .addMatcher(
      api.endpoints.addInFavorite.matchRejected,
      (state, { payload, error }) => {
        if (!payload) {
          console.error('Error', error);
        } else {
          console.error('Error', payload);
          if (payload.status === 400) {
            console.error('Error 400', payload.data);
          }
        }
      }
    )
  },
});

export const { activatePromo } = authSlice.actions;
export default authSlice.reducer;
