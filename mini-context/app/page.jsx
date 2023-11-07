"use client"

import Login from "./components/Login";
import Profile from "./components/Profile";
import UserContextProvider from "./context/UserContextProvider";

export default function Home() {
  return (
   <UserContextProvider>
   <h1>Mini Context</h1>
   <Login />
   <Profile />
   </UserContextProvider>
  )
}
