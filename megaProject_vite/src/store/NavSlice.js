import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 navItems: [
  {
   name: "Home",
   slug: "/",
   active: true
  },
  {
   name: "AllPost",
   slug: "/all-posts",
   active: ""
  },
  {
   name: "AddPost",
   slug: "/add-post",
   active: ""
  }
 ],
 authItems: [
  {
   name: "Login",
   slug: "/login",
   active: ""
  },
  {
   name: "Signup",
   slug: "signup",
   active: ""
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
