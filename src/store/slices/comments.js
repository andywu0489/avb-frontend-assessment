import { createSlice } from "@reduxjs/toolkit";

export const name = "comments";
const initialState = {
  comments: [],
};

const commentsSlice = createSlice({
  name,
  initialState,
  reducers: {
    addComment(state, action) {
      // Add correct id to comment. The test api does not return correct id since it doesn't add the data to db.
      action.payload.id = state.comments.length + 1;
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },
    setComments(state, action) {
      return {
        ...state,
        comments: [...action.payload],
      };
    },
  },
});

export const { addComment, setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
