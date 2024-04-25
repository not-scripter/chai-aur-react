import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinkBtn({
  children,
  to = {},
  className = {},
  bg = "bg-primary",
  fg = "text-secondary",
  activeBg = "bg-secondary",
  activeFg = "text-primary",
  loading = false,
  onClick = {},
  key = {},
  ...props
}) {
  return (
    <NavLink
      onClick={onClick}
      key={key}
      className={({ isActive }) =>
        [
          isActive ? `${activeBg} ${activeFg}` : `${bg} ${fg}`,
          `${className} rounded-full px-6 py-1 font-semibold flex items-center justify-center shadow active:bg-opacity-80 hover:outline hover:outline-secondary/20 hover:outline-4`,
        ].join(" ")
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}
