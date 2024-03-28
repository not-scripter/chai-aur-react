import React from "react";
import { loader } from "../assets";

export default function Loader() {
  return (
    <main className="absolute w-full h-dvh top-0 left-0 bg-primary text-secondary backdrop-blur flex items-center justify-center">
      <img src={loader} />
    </main>
  );
}
