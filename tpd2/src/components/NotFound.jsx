import React from "react";
import CardBox from "./CardBox";

export default function NotFound({ title = "" }) {
  return (
    <CardBox>
      <h1 className="font-semibold">{title ? title : "Not Found"}</h1>
    </CardBox>
  );
}
