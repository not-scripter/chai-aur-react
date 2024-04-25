import React, { useState } from "react";
import CheckBox from "../components/CheckBox";
import { LikeSvg } from "../assets";

export default function Test() {
  const [liked, setliked] = useState(false)
  return (
  <div className="m-40">
      <button type="button" onClick={() => setliked(prev => !prev)}>
    <CheckBox checked={liked}>
        <LikeSvg className={liked ? "fill-fuchsia-500 stroke-fuchsia-500" : "fill-secondary stroke-secondary"}/>
      </CheckBox>
      </button>
  </div>
  );
}
