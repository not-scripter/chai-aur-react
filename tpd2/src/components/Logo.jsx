import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ className = "" }) {
  return (
    <Link to={`/`}>
      <div className={`${className} w-fit`}>
        <h1 className="font-bold text-3xl text-secondary">TPD2</h1>
      </div>
    </Link>
  );
}
