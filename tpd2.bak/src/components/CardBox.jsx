import React from "react";

export default function CardBox({ children, className="" }) {
  return (
    <div className={`flex flex-col gap-2 bg-primary/20 backdrop-blur rounded-xl p-4 shadow-secondary/20 shadow-md min-h-20 ${className}`}>
      {children}
    </div>
  );
}
