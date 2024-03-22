import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, CardBox, Container, Input } from "../components";
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
      <CardBox>
        <form
          onSubmit={handleSubmit(create)}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-secondary">Create Your Account</h1>
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
          <Button
            type="submit"
            className="w-full py-2"
          >Create Account</Button>
        </form>
      </CardBox>
    </Container>
  );
}
