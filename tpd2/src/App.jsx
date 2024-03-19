import React, { useEffect, useState } from "react";
import { Container, Footer, Header, Loader } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthServices from "./appwrite/AuthServices";
import { login, logout } from "./store/AuthSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <>
      {/* <Container> */}
        <Header />
        <Outlet />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition:Flip
        />
      {/* </Container> */}
    </>
  ) : (
    <Loader />
  );
}
