import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthServices from "../appwrite/AuthServices";
import { useSelector } from "react-redux";
import { Input } from "postcss";
import NotFound from "../components/NotFound";
import { Button } from "../components";

export default function Account() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const logout = async () => {
    try {
      const res = await AuthServices.logout();
      if (res) navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };
  const [editable, seteditable] = useState(false);
  return (
    <>
      {userData ? (
        <form>
          <Input
            label="Name"
            value={userData.name}
            {...(!editable && "readOnly")}
          />
          <Input
            label="Email"
            value={userData.email}
            {...(!editable && "readOnly")}
          />
          <Input
            label="Password"
            value={userData.password}
            {...(!editable && "readOnly")}
          />
          <Button onClick={() => seteditable((prev) => !prev)}>
            {!editable ? "Edit" : "Save"}
          </Button>
        </form>
      ) : (
        <NotFound />
      )}
    </>
  );
}
