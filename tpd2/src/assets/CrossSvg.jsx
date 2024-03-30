import React from "react";

export default function CrossSvg({ className, width = "4" }) {
  const localWidth = `w-${width} h-${width}`;
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
      className={`${className} ${localWidth} fill-secondary stroke-secondary`}
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{" "}
      </g>
    </svg>
  );
}
