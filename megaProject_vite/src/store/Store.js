import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./AuthSlice"
import PostSlice from "./PostSlice"

export const Store = configureStore({
 reducer: {
  auth: authSlice,
  post: PostSlice,
 }
})
 //TODO add more slises for post
