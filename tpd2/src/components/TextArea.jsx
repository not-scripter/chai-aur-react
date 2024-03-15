import React, { useId } from "react";

export default function TextArea({
  label = "",
  children,
  className = "",
  bg = "",
  fg = "",
  ...props
}) {
  const id = useId();
  return (
    <div className="grid">
      {label && (
        <label
          htmlFor={id}
          className="translate-y-1/2 bg-zinc-100 text-zinc-900 ml-8 px-4 w-fit rounded-full"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        type={type}
        ref={ref}
        {...props}
        className={`${className} ${bg} ${fg} rounded-full px-4 py-4 outline-none border-none hover:outline-none focus:border-x-2 focus:border-zinc-200`}
      >
        {children}
      </textarea>
    </div>
  );
}
