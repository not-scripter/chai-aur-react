import React, { useId } from "react";

const Select = ({
  label = "",
  options = [],
  bg = "bg-preprimary",
  fg = "text-presecondary",
  className = "",
  placeholder,
  disabled,
  ...props
}) => {
  const id = useId();
  function cfl(item) {
    return item.charAt(0).toUpperCase() + item.slice(1);
  }
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
      <select
        id={id}
        {...props}
        className={`${className} ${bg} ${fg} rounded-xl px-4 py-2 outline-none border-secondary/60 border-4 focus:border-4 focus:border-secondary`}
      >
        {placeholder && <option value={placeholder}>{placeholder}</option>}
        {options.map((item) => (
          <option disabled={disabled} value={item}>
            {cfl(item)}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Select;
