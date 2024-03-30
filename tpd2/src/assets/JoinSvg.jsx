import React from "react";

export default function JoinSvg({ className, width = "4" }) {
  const localWidth = `w-${width} h-${width}`;
  return (
    <svg
      className={`${className} ${localWidth} fill-secondary stroke-secondary`}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xml:space="preserve"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M469.333,0h-42.667C403.109,0,384,19.109,384,42.667v42.667C384,108.891,403.109,128,426.667,128v106.667H320 C320,211.109,300.891,192,277.333,192h-42.667C211.109,192,192,211.109,192,234.667H64c-11.782,0-21.333,9.551-21.333,21.333v128 C19.109,384,0,403.109,0,426.667v42.667C0,492.891,19.109,512,42.667,512h42.667C108.891,512,128,492.891,128,469.333v-42.667 C128,403.109,108.891,384,85.333,384V277.333H192C192,300.891,211.109,320,234.667,320h42.667 C300.891,320,320,300.891,320,277.333h128c11.782,0,21.333-9.551,21.333-21.333V128C492.891,128,512,108.891,512,85.333V42.667 C512,19.109,492.891,0,469.333,0z M85.333,469.333H42.667v-42.667h42.667V469.333z M277.333,277.333h-42.667v-42.667h42.667 V277.333z M469.333,85.333h-42.667V42.667h42.667V85.333z" />{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
