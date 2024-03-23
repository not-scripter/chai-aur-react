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
          className="absolute top-0 bg-preprimary text-presecondary ml-6 px-2 w-fit rounded-full text-sm"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        {...props}
        className={`${className} ${bg} ${fg} rounded-xl px-4 py-2 outline-none border-secondary/60 border-4 focus:border-4 focus:border-secondary`}
      />
    </div>
  );
};
export default React.forwardRef(Input);
