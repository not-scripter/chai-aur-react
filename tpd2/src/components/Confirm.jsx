import React from "react";
import Button from "./Button";
import Modal from "./Modal";

export default function Confirm({
  open = {},
  setopen = () => {},
  cancelText = "Cancel",
  proceedText = "Proceed",
  warning = "Warning",
  warningDesc = "Proceed",
  proceedTo,
}) {
  return (
    <Modal open={open} onClose={() => setopen(false)}>
      <div className="flex flex-col">
        <h1 className="text-center text-xl font-bold">{warning}</h1>
        <h1 className="text-center text-presecondary/50 font-bold">
          Are You Sure ! You want to {warningDesc} ?
        </h1>
      </div>
      <div className="flex gap-2">
        <Button
          className="w-full py-2 rounded-xl"
          onClick={() => setopen(false)}
        >
          {cancelText}
        </Button>
        <Button
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
