import { createSlice } from "@reduxjs/toolkit";
import { mockComments } from "../../store/api";

export const name = "comments";
const initialState = {
  comments: [...mockComments],
};

const commentsSlice = createSlice({
  name,
  initialState,
  reducers: {
    addComment(state, action) {
      //add id to comment -- remove after connecting to api
      action.payload.id = state.comments.length + 1;

      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },
  },
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
