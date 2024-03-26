import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardBox, Confirm, Input } from "../index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthServices from "../../appwrite/AuthServices";
import { login } from "../../store/AuthSlice";

export default function UpdateContacts() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {userData, profileData} = useSelector((state) => state.auth);
    const defaultValues = {
      phone: userData.phone,
      email: userData.email,
      password: null,
    }
  const { handleSubmit, register, setValue, reset } = useForm({
    defaultValues
  });
  const [editable, seteditable] = useState(false);
  const [open, setopen] = useState(false);
console.log(userData)
  const updateContacts = async (data) => {
    data.phone && AuthServices.updatePhone(data) 
        .then((authRes) => {
          dispatch(login({userData: authRes}))
          setValue("phone", authRes.phone)
          toast.success("Phone Updated");
          seteditable(false);
          setopen(false);
        })
        .catch(() => toast.error("Password Incorrect"));
      data.email && AuthServices.updateEmail(data)
        .then((authRes) => {
          dispatch(login({userData: authRes}))
          setValue("email", authRes.email)
          toast.success("Email Updated");
          seteditable(false);
          setopen(false);
        })
        .catch(() => toast.error("Password Incorrect"));
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
          {...register("email", { required: true })}
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
