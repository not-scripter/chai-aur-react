import React, { useId } from "react";

function TextArea({
  label = "",
  children,
  className = "",
    bg = "bg-primary/50",
    fg = "text-presecondary",
  ...props
}, ref) {
  const id = useId();
  return (
    <div className="relative flex py-2 h-40">
      {label && (
        <label
          htmlFor={id}
          className="absolute top-0 bg-preprimary text-presecondary ml-6 px-2 w-fit rounded-full text-sm"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        ref={ref}
        {...props}
        className={`${className} ${bg} ${fg} rounded-xl px-4 py-2 outline-none border-secondary/50 border-4 focus:border-4 focus:border-secondary w-full h-full`}
      >
        {children}
      </textarea>
    </div>
  );
}
export default React.forwardRef(TextArea)
