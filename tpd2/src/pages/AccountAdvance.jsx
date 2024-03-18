import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthServices from "../appwrite/AuthServices";
import { Button } from "../components";
import { useDispatch } from "react-redux";
import { logout } from "../store/AuthSlice";

export default function AccountAdvance() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    AuthServices.logout().then(() => {
      dispatch(logout());
      toast.success("Logout Successfull");
      navigate("/login");
    });
  };
  return (
    <>
      <Button onClick={logoutHandler} bg="bg-red-600" fg="text-black">
        Logout
      </Button>
    </>
  );
}
