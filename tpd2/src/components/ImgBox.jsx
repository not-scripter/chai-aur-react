import React from "react";

export default function ImgBox({ src = {} }) {
  return (
    src && (
      <div>
        <img src={src} alt="Image Not Found" />
      </div>
    )
  );
}
