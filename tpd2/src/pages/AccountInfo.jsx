import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Input } from "postcss";
import NotFound from "../components/NotFound";
import { Button } from "../components";

export default function AccountInfo() {
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
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
