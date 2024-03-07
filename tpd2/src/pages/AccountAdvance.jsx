import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthServices from "../appwrite/AuthServices";
import { Button } from "../components";

export default function AccountAdvance() {
  const navigate = useNavigate();
  console.log(userData);
  const logout = async () => {
    try {
      const res = await AuthServices.logout();
      if (res) navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <Button onClick={logout} bg="bg-red-600" fg="text-black">
        Logout
      </Button>
    </>
  );
}
