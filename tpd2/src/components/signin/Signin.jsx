import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Logo from "../Logo";
import Input from "../Input";
import { useDispatch } from "react-redux";
import AuthServices from "../../appwrite/AuthServices";
import { login as signin } from "../../store/AuthSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    try {
      const session = await AuthServices.login(data);
      if (session) {
        const userData = await AuthServices.getUser();
        if (userData) {
          toast.success("Login Sucsessful");
          dispatch(signin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(login)}
      className="grid items-center justify-center"
    >
      <h1 className="text-zinc-100">Signin to Your Account</h1>
      <Input
        label="Email"
        type="email"
        placeholder="Enter Your Email Address"
        {...register("email", {
          required: true,
          validate: {
            matchPatern: (value) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
              "Email address must be a valid address",
          },
        })}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter Your Password"
        {...register("password", {
          required: true,
        })}
      />
      <Button type="submit">Login</Button>

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
        theme="dark"
        transition:Flip
      />
    </form>
  );
}
