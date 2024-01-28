import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 title: "test",
 slug: "test",
 content: "testContent",
 status: "active"
}

const PostSlice = createSlice({
 name: "post",
 initialState,
 reducers: {
  setPost: (state, action) => {
   state.title = action.payload.title;
   state.slug = action.payload.slug;
   state.content = action.payload.content;
   state.status = action.payload.status;
  },
 }
})

export const { setPost } = PostSlice.actions;

export default PostSlice.reducer;
