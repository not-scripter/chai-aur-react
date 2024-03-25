import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, CardBox, Input } from "../components";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthServices from "../appwrite/AuthServices";

export default function AccountSecurity() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      phone: userData.phone,
      email: userData.email,
      // password: userData.password,
    },
  });
  const [editable, seteditable] = useState(false);

  const submit = async (data) => {
    const res =
      AuthServices.updatePhone(data) && AuthServices.updateEmail(data);
    res
      .then(() => {
        toast.success("Phone Updated");
        seteditable(false);
      })
      .catch(() => toast.error("Password Incorrect"));

    reset();
  };
  return (
    <CardBox>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Phone"
          readOnly={!editable}
          placeholder="Enter your Mobile Number"
          {...register("phone", { required: false })}
        />
        <Input
          label="Email"
          readOnly={!editable}
          placeholder="Enter your Email"
          {...register("email", { required: false })}
        />
        <Input
          label="Password"
          type="password"
          readOnly={!editable}
          placeholder="Enter your Password to Save"
          {...register("password", { required: true })}
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
