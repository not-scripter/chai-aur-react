import React, { useId } from "react";

const Input = (
  {
    type = "text",
    bg = "bg-preprimary",
    fg = "text-presecondary",
    className = "",
    label,
    ...props
  },
  ref,
) => {
  const id = useId();
  return (
    <div className="relative flex flex-col py-2">
      {label && (
        <label
          htmlFor={id}
          className="absolute top-0 bg-secondary text-primary ml-8 px-4 w-fit rounded-full text-sm"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        {...props}
        className={`${className} ${bg} ${fg} rounded-full px-4 py-2 outline-none border-presecondary border-4 focus:border-4 focus:border-secondary focus:outline-secondary/20 focus:outline-4`}
      />
    </div>
  );
};
export default React.forwardRef(Input);
