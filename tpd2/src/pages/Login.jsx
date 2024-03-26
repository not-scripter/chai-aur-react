import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, Logo, Button, Container, CardBox } from "../components";
import { useDispatch } from "react-redux";
import AuthServices from "../appwrite/AuthServices";
import { login as loginAuth } from "../store/AuthSlice";
import toast from "react-hot-toast";
import PostServices from "../appwrite/PostServices";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    const account = await AuthServices.login(data);
    if (account) {
      const userData = await AuthServices.getCurrentUser();
      if (userData) {
        console.log(userData.$id);
        const profileData = await PostServices.getProfile({
          userId: userData.$id,
        });
        if (userData && profileData) {
          toast.success("Login Sucsessful");
          dispatch(loginAuth({ userData, profileData }));
          navigate("/");
        }
      }
    }
  };
  return (
    <Container>
      <CardBox>
        <form
          onSubmit={handleSubmit(login)}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-secondary">Signin to Your Account</h1>
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
          <Button type="submit" className="w-full py-2">
            Login
          </Button>
          <h1 className="font-semibold text-secondary/50 text-center">or</h1>
          <Button
            onClick={() => navigate("/Signup")}
            className="w-full py-2 border-secondary border-4"
            bg="bg-primary-50"
            fg="text-secondary"
          >
            Create Account
          </Button>
        </form>
      </CardBox>
    </Container>
  );
}
