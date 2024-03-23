import React from "react";
import CardBox from "./CardBox";
import Button from "./Button";
import Container from "./container/Container";
import Modal from "./Modal";

export default function Confirm({
  open = {},
  setopen = () => {},
  cancelText = "Cancel",
  proceedText = "Proceed",
  warning = "Warning",
  warningDesc = "Are you Sure ?",
}) {
  return (
    <Modal open={open} onClose={() => setopen(false)}>
      <div className="flex flex-col">
        <h1 className="text-center text-xl font-bold">{warning}</h1>
        <h1 className="text-center text-presecondary/50 font-bold">{warningDesc}</h1>
      </div>
      <div className="flex gap-2">
        <Button className="w-full py-2 rounded-xl" onClick={() => setopen(false)}>{cancelText}</Button>
        <Button className="w-full py-2 rounded-xl" onClick={() => setopen(false)}>{proceedText}</Button>
      </div>
    </Modal>
  );
}
