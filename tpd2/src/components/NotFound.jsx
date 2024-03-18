import React from "react";

export default function NotFound({ title = "" }) {
  return (
    <div className="grid bg-zinc-500/50 items-center justify-center rounded-l shadow">
      <h1>{title ? title : "Not Found"}</h1>
    </div>
  );
}
