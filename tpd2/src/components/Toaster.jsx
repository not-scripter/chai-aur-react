import React from "react";
import toast, {
  Toaster as HotToaster,
  ToastIcon,
  resolveValue,
} from "react-hot-toast";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Toaster() {
  return (
    <HotToaster
      containerClassName=""
      containerStyle={{ top: 8, left: 8, bottom: 8, right: 8, }}
    >
      {(t) => (
        <div
          className="relative bg-preprimary text-presecondary w-full px-4 py-4 rounded-xl shadow-sm shadow-secondary/20 flex gap-2 font-semibold"
          style={{ opacity: t.visible ? 1 : 0 }}
        >
          <ToastIcon toast={t} />
          {resolveValue(t.message, t)}
          <Button
            className="absolute top-3 right-2 w-8 h-8 rounded-full"
            onClick={() => toast.dismiss(t.id)}
          >
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </Button>
        </div>
      )}
    </HotToaster>
  );
}
