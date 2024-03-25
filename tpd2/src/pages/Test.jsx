import React from "react";
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

  const create = async (data) => {
    const userData = await AuthServices.getCurrentUser();
    const profileData = await PostServices.createProfile({
      userId: data.userId,
      username: userData.name,
    });
    console.log(userData.$id);
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
            label="UserName"
            placeholder="Enter Your UserName"
            {...register("userId", {
              required: true,
            })}
          />
          <Button type="submit" className="w-full py-2">
            Create Account
          </Button>
        </form>
      </CardBox>
    </Container>
  );
}
