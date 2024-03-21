import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Container } from "../components";

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
      <Container>
      <div>
        <section className="bg-preprimary overflow-x-scroll flex gap-2 px-2 py-2 rounded-full shadow">
          {accItems.map((item) => (
            <NavLink
              to={item.slug}
              className={({ isActive }) => [
                isActive ? "bg-secondary text-primary" : "bg-primary text-secondary",
                "rounded-full px-6 py-1 font-semibold flex items-center justify-center shadow active:bg-opacity-80 hover:outline hover:outline-secondary/20 hover:outline-4"
              ].join(" ")}
            >
              {item.name}
            </NavLink>
          ))}
        </section>
        <section>{children}</section>
      </div>
      </Container>
    </>
  );
}
