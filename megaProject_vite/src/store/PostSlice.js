import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 Title: "",
 Content: "",
 Status: "",
 featuredImage: "",
 $id: "",
 UserId: "",
}

const PostSlice = createSlice({
 name: "post",
 initialState,
 reducers: {
  setPost: (state, action) => {
   state.Title = action.payload.Title;
   state.Content = action.payload.Content;
   state.Status = action.payload.Status;
   state.featuredImage = action.payload.featuredImage;
   state.$id = action.payload.$id;
   state.UserId = action.payload.UserId;
  },
  clearPost: (state) => {
   state.Title = "";
   state.Content = "";
   state.Status = "";
   state.featuredImage = "";
   state.$id = "";
   state.UserId = "";
  },
 }
})

export const { setPost, clearPost } = PostSlice.actions;

export default PostSlice.reducer;
