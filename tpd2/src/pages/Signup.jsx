import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, CardBox, Container, Input } from "../components";
import AuthServices from "../appwrite/AuthServices";
import { login } from "../store/AuthSlice";
import toast from "react-hot-toast";
import PostServices from "../appwrite/PostServices";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState({})

  const create = async (data) => {
    seterror({})
    const account = await AuthServices.createAccount(data);
    if (account) {
      const userData = await AuthServices.getCurrentUser();
      if (userData) {
        const profileData = await PostServices.createProfile({
          userId: userData.$id,
          fullname: data.fullname,
          username: userData.name,
          email: userData.email,
          joined: userData.$createdAt,
        });
        if (userData && profileData) {
          dispatch(login({ userData, profileData }));
          toast.success("Account Created Successfull");
          navigate("/");
        } else toast.error("Signup Error");
      }
    }
  };
  return (
    <Container>
      <CardBox>
        <form
          onSubmit={handleSubmit(create)}
          className="flex flex-col items-center justify-center gap-2"
        >
          <h1 className="text-secondary font-semibold text-xl py-2">Create Your Account</h1>
          <div>
            <Input
              label="Fullname"
              placeholder="Enter Your Fullname"
              {...register("fullname", {
                required: true,
              })}
            />
            <Input
              label="UserName"
              placeholder="Enter Your UserName"
              {...register("username", {
                required: true,
                validate: {
                  matchPatern: (val) => /^[a-zA-Z0-9_-]{3,16}$/.test(val) || seterror((prev) => ({...prev, username: "Please Enter A Valid Username"}))
                }
              })}
            />
            {error.username && <h1 className="text-sm font-semibold text-red-500/50">{error.username}</h1>}
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
          </div>
          <div className="w-full">
            <Button type="submit" className="w-full py-2">
              Create Account
            </Button>
            <h1 className="font-semibold text-secondary/50 text-center">or</h1>
            <Button
              onClick={() => navigate("/Login")}
              className="w-full py-2 border-secondary border-4"
              bg="bg-primary-50"
              fg="text-secondary"
            >
              Login
            </Button>
          </div>
        </form>
      </CardBox>
    </Container>
  );
}
