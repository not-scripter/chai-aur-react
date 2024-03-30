import React from "react";
import { LoaderSvg } from "../assets";

export default function Loader() {
  return (
    <main className="absolute z-20 w-full h-dvh top-0 left-0 bg-primary text-secondary backdrop-blur flex items-center justify-center">
      <LoaderSvg />
    </main>
  );
}
