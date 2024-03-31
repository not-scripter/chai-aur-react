import React from "react";

export default function CrossSvg({ className = "fill-secondary stroke-secondary", width = "4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
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
          d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19"
      className={`${className} w-${width} h-${width}`}
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{" "}
      </g>
    </svg>
  );
}
