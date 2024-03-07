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
      <main>
        <section>
          {accItems.map((item) => (
            <NavLink
              to={item.slug}
              className={({ isActive }) => (isActive ? "bg-orange-400" : "")}
            >
              {item.name}
            </NavLink>
          ))}
        </section>
        <section>{children}</section>
      </main>
    </>
  );
}
