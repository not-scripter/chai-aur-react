import React, { useId } from "react";

const Input = (
  {
    type = "text",
    bg = "bg-zinc-800",
    fg = "text-zinc-200",
    className = "",
    label,
    ...props
  },
  ref,
) => {
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
      <input
        id={id}
        type={type}
        ref={ref}
        {...props}
        className={`${className} ${bg} ${fg} rounded-full px-4 py-4 hover:outline-none focus:border-x-2 focus:border-zinc-200`}
      />
    </div>
  );
};
export default React.forwardRef(Input);
