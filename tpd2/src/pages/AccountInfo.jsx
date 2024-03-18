import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button, Input } from "../components";

export default function AccountInfo() {
  const userData = useSelector((state) => state.auth.userData);
  const [editable, seteditable] = useState(false);
  return (
    <>
      <form>
        <Input
          label="Name"
          value={userData.name}
          {...(!editable && "readOnly")}
        />
        <Button onClick={() => seteditable((prev) => !prev)}>
          {!editable ? "Edit" : "Save"}
        </Button>
      </form>
    </>
  );
}
