import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Container, Input } from "../components";
import { toast } from "react-toastify";
import AuthServices from "../appwrite/AuthServices";
import { login } from "../store/AuthSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    const account = await AuthServices.createAccount(data);
    if (account) {
      const userData = await AuthServices.getUser();
      if (userData) {
        dispatch(login(userData));
        toast.success("Account Created Successfull");
        navigate("/");
      }
    }
  };
  return (
    <Container>
    <form
      onSubmit={handleSubmit(create)}
      className="grid items-center justify-center"
    >
      <h1 className="text-zinc-100">Create Your Account</h1>
      <Input
        label="Name"
        placeholder="Enter Your Full Name"
        {...register("name", {
          required: true,
        })}
      />
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
      <Button type="submit">Create Account</Button>
    </form>
    </Container>
  );
}
