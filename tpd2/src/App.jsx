import React, { useEffect, useState } from "react";
import { Container, Footer, Header, Loader } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthServices from "./appwrite/AuthServices";
import { login, logout } from "./store/AuthSlice";

export default function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    AuthServices.getUser()
      .then((userData) => {
        if (userData) dispatch(login(userData))
        else dispatch(logout())
      })
    .finally(setloading(false))
  }, []);

  return !loading ? (
    <>
      <Container>
        <Header />
        <Outlet />
        <Footer />
      </Container>
    </>
  ) : <Loader />
}
