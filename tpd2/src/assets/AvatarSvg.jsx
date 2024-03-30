import React from "react";

export default function AvatarSvg({ className, width = "4" }) {
  const localWidth = `w-${width} h-${width}`;
  return (
    <svg
      viewBox="-1.6 -1.6 19.20 19.20"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${localWidth} fill-secondary stroke-secondary`}
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
          d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
      className={`${className} ${localWidth} fill-secondary stroke-secondary`}
        />{" "}
      </g>
    </svg>
  );
}
