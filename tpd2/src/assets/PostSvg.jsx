import React from "react";

export default function PostSvg({
  className = "fill-secondary stroke-secondary",
  width = "4",
}) {
  return (
    <svg
      className={`${className} w-${width} h-${width}`}
      version="1.1"
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      xml:space="preserve"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M25,4H7C4.2,4,2,6.2,2,9v14c0,2.8,2.2,5,5,5h18c2.8,0,5-2.2,5-5V9C30,6.2,27.8,4,25,4z M7,11c0-0.6,0.4-1,1-1h6 c0.6,0,1,0.4,1,1v6c0,0.6-0.4,1-1,1H8c-0.6,0-1-0.4-1-1V11z M24,22H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h16c0.6,0,1,0.4,1,1S24.6,22,24,22z M24,18h-6c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S24.6,18,24,18z"></path>{" "}
      </g>
    </svg>
  );
}
