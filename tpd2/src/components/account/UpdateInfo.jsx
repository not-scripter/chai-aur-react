import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardBox, Input } from "../index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthServices from "../../appwrite/AuthServices";
import PostServices from "../../appwrite/PostServices";
import { login } from "../../store/AuthSlice";

export default function UpdateInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, profileData } = useSelector((state) => state.auth);
  const defaultValues = {
    fullname: profileData?.fullname,
    username: userData?.name,
  }
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues
  });

  const [editable, seteditable] = useState(false);

  const submit = async (data) => {
    AuthServices.updateName(data)
      .then((authRes) => {
        PostServices.updateProfile({
          userId: userData?.$id,
          fullname: data.fullname,
          username: data.username,
        })
          .then((proRes) => {
            dispatch(login({userData: authRes, profileData: proRes}))
            toast.success("Info Updated");
            seteditable(false);
            setValue("fullname", proRes.fullname)
            setValue("username", authRes.name)
          })
          .catch(() => {
            toast.error("Fullname Error");
          });
      })
      .catch(() => toast.error("Error"));
  };
  return (
    <CardBox>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Fullname"
          readOnly={!editable}
          placeholder="Enter your Fullname"
          {...register("fullname", { required: true })}
        />
        <Input
          label="Username"
          readOnly={!editable}
          placeholder="Enter your Username"
          {...register("username", { required: true })}
        />
        <div className="flex gap-2">
          {editable ? (
            <>
              <Button
                onClick={() => {
                  seteditable(false);
                  reset(defaultValues);
                }}
                className="w-full py-2"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full py-2">
                Save
              </Button>
            </>
          ) : (
              <Button onClick={() => seteditable(true)} className="w-full py-2">
                Edit
              </Button>
            )}
        </div>
      </form>
    </CardBox>
  );
}
