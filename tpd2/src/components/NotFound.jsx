import React from "react";

export default function NotFound({ title = "" }) {
  return (
    <div className="grid items-center justify-center rounded-l shadow">
      <h1>{title ? title : "Not Found"}</h1>
    </div>
  );
}
