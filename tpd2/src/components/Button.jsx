import React from "react";

export default function Button({
  children,
  type = "button",
  bg = "bg-orange-500",
  fg = "text-black",
  className = "",
  loading = false,
  onClick = {},
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className={`${bg} ${fg} ${className} rounded-full px-6 py-1 font-semibold flex items-center justify-center shadow active:bg-opacity-80 hover:outline hover:outline-orange-500/20 hover:outline-4`}
    >
      {loading ? (
        <svg
          className="h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 150"
        >
          <path
            fill="none"
            stroke="#FFFFFF"
            stroke-width="30"
            stroke-linecap="round"
            stroke-dasharray="300 385"
            stroke-dashoffset="0"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
          >
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="2"
              values="685;-685"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animate>
          </path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
