import React from "react";

export default function Logo({ className = "" }) {
  return (
    <div className={`${className} w-fit`}>
      <h1 className="font-bold text-3xl text-orange-600">TPD2</h1>
    </div>
  );
}
