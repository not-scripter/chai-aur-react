import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../appwrite/AuthServices";
import { Button, CardBox, Confirm } from "../components";
import { useDispatch } from "react-redux";
import { logout } from "../store/AuthSlice";
import toast from "react-hot-toast";

export default function AccountAdvance() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setopen] = useState(null)

  const handleLogout = () => {
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
          onClick={() => setopen(true)}
          bg="bg-red-600"
          fg="text-black"
          className="w-full py-2"
        >
          Logout
        </Button>
      </CardBox>
      <Confirm open={open} setopen={setopen} proceedText="Logout" warningDesc="Logout" proceedTo={handleLogout}/>
    </>
  );
}
