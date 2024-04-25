import React from "react";

export default function EditSvg({ className = "fill-secondary stroke-secondary", width = "4" }) {
  return (
    <svg
      className={`${className} w-${width} h-${width}`}
      viewBox="-2.4 -2.4 28.80 28.80"
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
        <g id="style=fill">
          {" "}
          <g id="edit">
            {" "}
            <path
              id="Subtract"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.9405 3.12087L21.0618 5.24219C22.2334 6.41376 22.2334 8.31326 21.0618 9.48483L19.2586 11.288L12.8947 4.92403L14.6978 3.12087C15.8694 1.94929 17.7689 1.94929 18.9405 3.12087ZM11.834 5.98469L3.70656 14.1121C3.22329 14.5954 2.91952 15.2292 2.84552 15.9086L2.45151 19.5264C2.31313 20.7969 3.38571 21.8695 4.65629 21.7311L8.27401 21.3371C8.95345 21.2631 9.58725 20.9594 10.0705 20.4761L18.1979 12.3486L11.834 5.98469Z"
      className={`${className} w-${width} h-${width}`}
            />{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
