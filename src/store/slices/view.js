import { createSlice, createSelector } from "@reduxjs/toolkit";

export const name = "view";
const initialState = {
  commentsModalOpen: false,
  topListModalOpen: false,
};

const viewSlice = createSlice({
  name,
  initialState,
  reducers: {
    openCommentsModal(state) {
      state.commentsModalOpen = true;
    },
    closeCommentsModal(state) {
      state.commentsModalOpen = false;
    },
    openTopListModal(state) {
      state.topListModalOpen = true;
    },
    closeTopListModal(state) {
      state.topListModalOpen = false;
    },
  },
});

const getSlice = (state) => state[name] || {};

export const getViewCommentsModalOpen = createSelector(
  getSlice,
  (slice) => slice.commentsModalOpen
);

export const getViewTopListModalOpen = createSelector(
  getSlice,
  (slice) => slice.topListModalOpen
);

export const {
  openCommentsModal,
  closeCommentsModal,
  openTopListModal,
  closeTopListModal,
} = viewSlice.actions;
export default viewSlice.reducer;
