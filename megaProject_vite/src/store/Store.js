import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./AuthSlice"
import NavSlice from "./NavSlice"

export const Store = configureStore({
 reducer: {
  auth: AuthSlice,
  nav: NavSlice,
 }
})
