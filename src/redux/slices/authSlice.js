// eslint-disable-next-line
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../app/store';
import { api } from '../api/index.js';

const initialState = {
  token: "",
  favorites: []
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
  },
});

export const { activatePromo } = authSlice.actions;
export default authSlice.reducer;
