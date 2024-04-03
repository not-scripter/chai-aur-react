import React, { useId } from "react";

const Input = (
  {
    type = "text",
    bg = "bg-primary/50",
    fg = "text-presecondary",
    className = "",
    label,
    readOnly,
    fixed,
    children,
    ...props
  },
  ref,
) => {
  const id = useId();
  return (
    <div className="relative flex py-2">
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
        readOnly={readOnly}
        {...props}
        className={`${className} ${bg} ${fg} rounded-xl px-4 py-2 outline-none border-secondary/50 border-4 focus:border-4 focus:border-secondary`}
      />
      {children}
    </div>
  );
};
export default React.forwardRef(Input);
