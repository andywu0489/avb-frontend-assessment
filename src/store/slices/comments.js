import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postComment } from "store/api";
export const name = "comments";
const initialState = {
  comments: [],
};

export const setComment = createAsyncThunk(
  "comments/setComment",
  async (commentForm) => {
    const response = await postComment(commentForm);
    return response.data;
  }
);

const commentsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setComments(state, action) {
      return {
        ...state,
        comments: [...action.payload],
      };
    },
  },
  extraReducers: {
    [setComment.fulfilled.toString()]: (state, action) => {
      // Add correct id to comment. The test api does not return correct id since it doesn't add the data to db.
      action.payload.id = state.comments.length + 1;
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },
  },
});

export const { addComment, setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
