import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, CardBox, Input } from "../components";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthServices from "../appwrite/AuthServices";

export default function AccountInfo() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      username: userData.name,
    },
  });
  const [editable, seteditable] = useState(false);

  const submit = async (data) => {
      AuthServices.updateName(data).then(() => {
        toast.success("Username Updated");
        seteditable(false);
      })
      .catch(() => toast.error("Error"));

    reset()
  };
  return (
    <CardBox>
      <form onSubmit={handleSubmit(submit)}>
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
