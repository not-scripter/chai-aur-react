import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button, CardBox, Input } from "../components";

export default function AccountInfo() {
  const userData = useSelector((state) => state.auth.userData);
  const [editable, seteditable] = useState(false);
  return (
    <CardBox>
      <form>
        <Input
          label="Name"
          value={userData.name}
          {...(!editable && "readOnly")}
        />
        <div className="flex gap-2">
          {!editable ? (
            <Button
              onClick={() => seteditable((prev) => !prev)}
              className="w-full py-2"
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                onClick={() => seteditable((prev) => !prev)}
                className="w-full py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => seteditable((prev) => !prev)}
                className="w-full py-2"
              >
                Save
              </Button>
            </>
          )}
        </div>
      </form>
    </CardBox>
  );
}
