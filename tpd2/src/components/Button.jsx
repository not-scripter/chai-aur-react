import React from "react";

export default function Button({
  children,
  type = "button",
  bg = "bg-secondary",
  fg = "text-primary",
  className = "px-6 py-1",
  loading = false,
  onClick,
  key,
  ref,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      ref={ref}
      {...props}
      className={`${bg} ${fg} ${className} rounded-xl font-semibold flex items-center justify-center shadow active:bg-opacity-80 hover:outline hover:outline-secondary/20 hover:outline-4 backdrop-blur`}
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
