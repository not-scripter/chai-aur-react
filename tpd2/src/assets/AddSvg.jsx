import React from "react";

export default function AddSvg({
  className = "fill-secondary stroke-secondary",
  width = "4",
}) {
  //Important -- w-4 h-4
  // className={`${className} w-${width} h-${width}`}
  return (
    <svg
      className={`${className} w-${width} h-${width}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3,11h8V3a1,1,0,0,1,2,0v8h8a1,1,0,0,1,0,2H13v8a1,1,0,0,1-2,0V13H3a1,1,0,0,1,0-2Z"></path></g></svg>
  );
}
