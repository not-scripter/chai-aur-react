import React from "react";

export default function MenuSvg({ className = "fill-secondary stroke-secondary", width = "4" }) {
  return (
    <svg
      viewBox="0 0 24.00 24.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M4 17H8M12 17H20M4 12H20M4 7H12M16 7H20"
      className={`${className} w-${width} h-${width}`}
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{" "}
      </g>
    </svg>
  );
}
