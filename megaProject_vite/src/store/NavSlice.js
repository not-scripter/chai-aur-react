import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 navItems: [
  {
   name: "Home",
   slug: "/",
  },
  {
   name: "AllPost",
   slug: "/all-posts",
  },
  {
   name: "AddPost",
   slug: "/add-post",
  }
 ],
 authItems: [
  {
   name: "Login",
   slug: "/login",
  },
  {
   name: "Signup",
   slug: "signup",
  }
 ]
}

const NavSlice = createSlice({
 name: "nav",
 initialState,
 reducers: {
  setNav: (state, action) => {}
 }
})

export const { setNav } = NavSlice.actions;

export default NavSlice.reducer;
