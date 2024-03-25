import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, CardBox, Input } from "../index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthServices from "../../appwrite/AuthServices";
import PostServices from "../../appwrite/PostServices";

export default function UpdateInfo() {
  const navigate = useNavigate();
  const { userData, profileData } = useSelector((state) => state.auth);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      fullname: profileData?.fullname,
      username: userData?.name,
    },
  });
  const [editable, seteditable] = useState(false);

  const submit = async (data) => {
    AuthServices.updateName(data)
      .then(() => {
        PostServices.updateProfile({
          userId: userData.$id,
          fullname: data.fullname,
          username: data.username,
        })
          .then(() => {
            toast.success("Info Updated");
            seteditable(false);
          })
          .catch(() => {
            toast.error("Fullname Error");
          });
      })
      .catch(() => toast.error("Error"));
    reset();
  };

  useEffect(() => {
  }, []);
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
                onClick={() => seteditable(false)}
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
