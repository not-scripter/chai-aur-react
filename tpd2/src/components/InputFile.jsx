import React, { useId } from "react";
import { add } from "../assets";

const InputFile = (
  {
    type = "text",
    bg = "bg-primary/50",
    fg = "text-presecondary",
    className = "",
    accept,
    label,
    readOnly,
    children,
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
        accept={accept}
        ref={ref}
        readOnly={readOnly}
        {...props}
        className="absolute opacity-0 w-full h-full"
      />
      <img
        src={add}
        className={`${className} ${bg} ${fg} h-12 py-2 rounded-xl outline-none border-secondary/50 border-4 focus:border-4 focus:border-secondary`}
      />
    </div>
  );
};
export default React.forwardRef(InputFile);
