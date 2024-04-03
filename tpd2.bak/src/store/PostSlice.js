import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    post: (state, action) => {},
  },
});

export const { post } = PostSlice.actions;

export default PostSlice.reducer;
