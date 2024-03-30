import React from "react";
import { Button } from "./";
import { CrossSvg } from "../assets";

export default function Modal({ open, onClose, children, className }) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 z-40 flex justify-center items-center transition-colors px-8 py-4
        ${open ? "visible bg-primary/20 text-secondary backdrop-blur" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          ${className}
          bg-preprimary rounded-xl shadow px-2 pt-6 pb-2 transition-all flex flex-col gap-6 w-full
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <Button
          onClick={onClose}
          bg="bg-primary/50"
          rounded="rounded-full"
          className="absolute top-2 right-2 w-8 h-8 p-1"
        >
          <CrossSvg />
          {/* <img src={cross}/> */}
        </Button>
        {children}
      </div>
    </div>
  );
}
