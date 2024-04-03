import React from "react";

function CheckBox({ checked, defaultChecked, className = "", children }, ref) {
  return (
    <div className={`${className} relative w-fit h-fit overflow-hidden`}>
      <input
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        ref={ref}
        className="w-full h-full absolute opacity-0"
      />
      {children}
    </div>
  );
}
export default React.forwardRef(CheckBox);
