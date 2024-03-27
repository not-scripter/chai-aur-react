import React from "react";

export default function ImgBox({ children, src, className = "" }) {
  return (
    <div className="relative">
      <img src={src} alt="Image Not Found" className={className} />
      {children}
    </div>
  );
}
