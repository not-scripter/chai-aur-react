import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthServices from "../appwrite/AuthServices";
import { useSelector } from "react-redux";
import { Input } from "postcss";
import { Button } from "../components";

export default function AccountSecurity() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const [editable, seteditable] = useState(false);
  return (
    <>
      <form>
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
    </>
  );
}
