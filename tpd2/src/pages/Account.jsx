import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export default function Account({ children }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const accItems = [
    {
      name: "Info",
      slug: "/account/info",
    },
    {
      name: "Security",
      slug: "/account/security",
    },
    {
      name: "Advance",
      slug: "/account/advance",
    },
  ];
  return (
    <>
      <div>
        <section className="bg-zinc-950 overflow-x-scroll flex gap-2 px-4 py-1">
          {accItems.map((item) => (
            <NavLink
              to={item.slug}
              className={({ isActive }) => [
                isActive ? "bg-orange-500 text-black" : "bg-zinc-500 text-white",
                "px-4 py-1 shadow hover:bg-orange-500 hover:text-black rounded-full"
              ].join(" ")}
            >
              {item.name}
            </NavLink>
          ))}
        </section>
        <section>{children}</section>
      </div>
    </>
  );
}
