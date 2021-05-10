import { createSlice } from "@reduxjs/toolkit";

export const name = "pagination";
const initialState = {
  page: 1,
};

const paginationSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.page = action.payload;
    },
    resetCurrentPage(state) {
      state.page = 1;
    },
  },
});

export const { setCurrentPage, resetCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
