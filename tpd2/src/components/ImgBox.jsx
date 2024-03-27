import React from "react";

export default function ImgBox({ children, src, className = "", boxClass = "" }) {
  return (
    <div className={boxClass}>
      <img src={src} alt="Image Not Found" className={className} />
      {children}
    </div>
  );
}
