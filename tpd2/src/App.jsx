import React, { useEffect, useState } from "react";
import { Footer, Header, Loader, Toaster } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthServices from "./appwrite/AuthServices";
import { login, logout } from "./store/AuthSlice";
import toast from "react-hot-toast";

export default function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    AuthServices.getUser()
      .then((userData) => {
        if (userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .finally(setloading(false));
  }, []);

  return !loading ? (
    <main className="min-h-dvh flex flex-col bg-zinc-900 text-white">
      <Header />
      <Outlet />
      <button onClick={() => toast.error("Testing")}>Test</button>
      <Footer />
      <Toaster />
    </main>
  ) : (
    <Loader />
  );
}
