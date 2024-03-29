import React, { useEffect, useState } from "react";
import { Footer, Header, Loader, Toaster } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthServices, PostServices } from "./appwrite";
import { login, logout } from "./store/AuthSlice";

export default function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  const getAccount = async () => {
    const userData = await AuthServices.getCurrentUser()
    if (userData) {
      const profileData = await PostServices.getProfile(userData.$id)
      if (profileData) {
        dispatch(login({ userData, profileData }))
        setloading(false)
      }
    } else {
      dispatch(logout())
      setloading(false)
    }
  }

  useEffect(() => {
    getAccount()
  }, []);

  return !loading ? (
    <main className="min-h-dvh flex flex-col bg-zinc-900 text-white">
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </main>
  ) : (
    <Loader />
  );
}
