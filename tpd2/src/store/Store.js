import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import PostSlice from "./PostSlice";

export default const Store = configureStore({
  reducer: {
    auth: AuthSlice,
    post: PostSlice,
  },
});
