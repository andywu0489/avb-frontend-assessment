import { createSlice } from "@reduxjs/toolkit";
// import { mockComments } from "../../store/api";

export const name = "comments";
const initialState = {
  comments: [],
};

const commentsSlice = createSlice({
  name,
  initialState,
  reducers: {
    addComment(state, action) {
      // add correct id to comment
      action.payload.id = state.comments.length + 1;

      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },
    setComments(state, action) {
      return {
        ...state,
        comments: [...state.comments, ...action.payload],
      };
    },
  },
});

export const { addComment, setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
