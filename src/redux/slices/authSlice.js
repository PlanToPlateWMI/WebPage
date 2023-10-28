// eslint-disable-next-line
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../app/store';
import { api } from '../api/index.js';

const initialState = {
  token: ""
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
        if(payload['response'] === 'ok') {
          state.goods = payload.items;
          state.totalCount = payload.items.reduce((accumulator, item) => accumulator + item.count, 0);
          state.selected = payload.items.filter((item) => item.count > 0).map((item) => item.categoryId);
          state.isHight = payload.hight;
        } else {
          state.goods = [];
          state.totalCount = 0;
          state.selected = [];
          state.isHight = payload.hight;
        }
      }
    )
  },
});

export const { activatePromo } = authSlice.actions;
export default authSlice.reducer;
