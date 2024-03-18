import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button, Input } from "../components";

export default function AccountSecurity() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
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
