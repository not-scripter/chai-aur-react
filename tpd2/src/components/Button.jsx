import React from "react";
import { loader } from "../assets";

export default function Button({
  children,
  type = "button",
  bg = "bg-secondary",
  fg = "text-primary",
  className = "px-6 py-1",
  rounded = "rounded-xl",
  loading,
  onClick,
  key,
  ref,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      ref={ref}
      {...props}
      className={` 
      ${bg} ${fg} ${className} ${rounded}
       font-semibold flex items-center justify-center shadow backdrop-blur 
       active:bg-opacity-80 
       hover:outline hover:outline-secondary/20 hover:outline-4 
`}
    >
      {loading ? <img src={loader} className="bg-cover w-6 h-6" /> : children}
    </button>
  );
}
