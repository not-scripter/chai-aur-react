import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardBox, Confirm, Input } from "../index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthServices from "../../appwrite/AuthServices";
import { login } from "../../store/AuthSlice";

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const { handleSubmit, register, setValue, reset } = useForm({
    defaultValues: {
      password: null,
      newPassword: null,
    }
  });
  const [editable, seteditable] = useState(false);
  const [open, setopen] = useState(false);

  const updatePassword = async (data) => {
    const userData = await AuthServices.updatePassword(data)
      .catch(() => toast.error("Password Incorrect"));
      if (userData) {
        dispatch(login({userData: authRes}))
        toast.success("Password Updated");
        seteditable(false);
        setopen(false);
      }
  };
  return (
    <form onSubmit={handleSubmit(updatePassword)}>
      <CardBox>
        <Input
          label="New Password"
          type="password"
          readOnly={!editable}
          placeholder="Enter your Password to Save"
          {...register("newPassword", { required: true })}
        />
        <div className="flex gap-2">
          {editable ? (
            <>
              <Button
                onClick={() => {seteditable(false); reset(defaultValues)}}
                className="w-full py-2"
              >
                Cancel
              </Button>
              <Button className="w-full py-2" onClick={() => setopen(true)}>
                Save
              </Button>
            </>
          ) : (
            <Button onClick={() => seteditable(true)} className="w-full py-2">
              Reset Password
            </Button>
          )}
        </div>
      </CardBox>
      <Confirm
        open={open}
        setopen={setopen}
        warningDesc="Confirm Your Password to Proceed"
        proceedTo={handleSubmit(updatePassword)}
        registerPassword={register}
      />
    </form>
  );
}
