import React from "react";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";

export default function Confirm({
  open,
  setopen,
  cancelText = "Cancel",
  proceedText = "Proceed",
  warning = "Warning",
  warningDesc = "Are You Sure ? You want to Proceed ?",
  proceedTo,
  registerPassword,
  loading,
}) {
  return (
    <Modal open={open} onClose={() => setopen(false)}>
      <div className="flex flex-col">
        <h1 className="text-center text-xl font-bold">{warning}</h1>
        <h1 className="text-center text-presecondary/50 font-bold">
          {warningDesc}
        </h1>
      </div>
      {registerPassword && (
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Enter Your Password"
          {...registerPassword("password", { required: true })}
        />
      )}
      <div className="flex gap-2">
        <Button
          className="w-full py-2 rounded-xl"
          onClick={() => {
            setopen(false);
            registerPassword && setpassword("");
          }}
        >
          {cancelText}
        </Button>
        <Button
          loading={loading}
          bg="bg-red-500"
          className="w-full py-2 rounded-xl"
          onClick={proceedTo}
        >
          {proceedText}
        </Button>
      </div>
    </Modal>
  );
}
