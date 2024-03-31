import React from "react";

export default function AddSvg({ className = "fill-secondary stroke-secondary", width = "4" }) { //Important -- w-4 h-4 
  return (
    <svg
      className={`${className} w-${width} h-${width}`}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="-51.2 -51.2 614.40 614.40"
      enable-background="new 0 0 512 512"
      xml:space="preserve"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="stroke-secondary"
        stroke-width="57.34400000000001"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M405.3,277.3c0,11.8-9.5,21.3-21.3,21.3 h-85.3V384c0,11.8-9.5,21.3-21.3,21.3h-42.7c-11.8,0-21.3-9.6-21.3-21.3v-85.3H128c-11.8,0-21.3-9.6-21.3-21.3v-42.7 c0-11.8,9.5-21.3,21.3-21.3h85.3V128c0-11.8,9.5-21.3,21.3-21.3h42.7c11.8,0,21.3,9.6,21.3,21.3v85.3H384c11.8,0,21.3,9.6,21.3,21.3 V277.3z" />{" "}
      </g>
    </svg>
  );
}
