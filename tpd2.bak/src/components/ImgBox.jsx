import React from "react";

export default function ImgBox({
  children,
  src,
  className = "",
  boxClass = "",
}) {
  return (
    <div className={boxClass}>
      <img src={src} className={className} />
      {children}
    </div>
  );
}
