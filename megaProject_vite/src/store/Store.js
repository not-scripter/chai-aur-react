import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./AuthSlice"

export const Store = configureStore({
 reducer: {
  auth: authSlice,
 }
})
 //TODO add more slises for post
