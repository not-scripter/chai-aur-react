import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthServices from "../appwrite/AuthServices";
import { Button, CardBox } from "../components";
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
      <CardBox className="flex flex-col gap-2 bg-primary/20 backdrop-blur rounded-xl p-4">
        <h1 className="text-presecondary text-xl">Logout from this Device</h1>
        <Button
          onClick={logoutHandler}
          bg="bg-red-600"
          fg="text-black"
          className="w-full py-2"
        >
          Logout
        </Button>
      </CardBox>
    </>
  );
}
