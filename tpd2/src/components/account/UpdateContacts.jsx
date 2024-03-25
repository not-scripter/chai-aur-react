import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, CardBox, Confirm, Input } from "../index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthServices from "../../appwrite/AuthServices";

export default function UpdateContacts() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      phone: userData.phone,
      email: userData.email,
      password: null,
    },
  });
  const [editable, seteditable] = useState(false);
  const [open, setopen] = useState(false);

  const updateContacts = async (data) => {
    console.log(data);
    AuthServices.updatePhone(data) &&
      AuthServices.updateEmail(data)
        .then(() => {
          toast.success("Contacts Updated");
          seteditable(false);
          setopen(false);
        })
        .catch(() => toast.error("Password Incorrect"));

    reset();
  };
  return (
    <form onSubmit={handleSubmit(updateContacts)}>
      <CardBox>
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
        <div className="flex gap-2">
          {editable ? (
            <>
              <Button
                onClick={() => seteditable(false)}
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
              Edit
            </Button>
          )}
        </div>
      </CardBox>
      <Confirm
        open={open}
        setopen={setopen}
        warningDesc="Confirm Your Password to Proceed"
        proceedTo={handleSubmit(updateContacts)}
        registerPassword={register}
      />
    </form>
  );
}
