import React from "react";

export default function Container({ children }) {
  return (
    <div className="flex flex-col gap-2 w-screen px-4 py-2 text-secondary">
      {children}
    </div>
  );
}
