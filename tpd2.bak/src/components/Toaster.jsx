import React from "react";
import toast, {
  Toaster as HotToaster,
  ToastIcon,
  resolveValue,
} from "react-hot-toast";
import { Button } from "./";
import { CrossSvg } from "../assets";

export default function Toaster() {
  return (
    <HotToaster
      containerClassName="z-50"
      containerStyle={{ top: 8, left: 8, bottom: 8, right: 8 }}
    >
      {(t) => (
        <div
          className="relative bg-preprimary text-presecondary w-full px-4 py-4 rounded-xl shadow-sm shadow-secondary/20 flex gap-2 font-semibold"
          style={{ opacity: t.visible ? 1 : 0 }}
        >
          <ToastIcon toast={t} />
          {resolveValue(t.message, t)}
          <Button
            rounded="rounded-full"
            bg="bg-primary/50"
            className="absolute top-3 right-3 w-8 h-8 p-1"
            onClick={() => toast.dismiss(t.id)}
          >
            <CrossSvg />
            {/* <img src={cross} /> */}
          </Button>
        </div>
      )}
    </HotToaster>
  );
}
