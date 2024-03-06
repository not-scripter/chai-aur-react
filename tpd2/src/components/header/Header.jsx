import React from "react";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.loginStatus);
  const navItems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/Signup",
      active: !authStatus,
    },
    {
      name: "Home",
      slug: "/home",
      active: authStatus,
    },
    {
      name: "All Post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <>
      <header>
        <section className="">
          <Logo />
          <nav>
            {navItems.map((items) =>
              items.active ? (
                <NavLink
                  key={items.slug}
                  to={items.slug}
                  className={({ isActive }) =>
                    isActive ? "bg-orange-500" : "bg-zinc-500"
                  }
                >
                  {items.name}
                </NavLink>
              ) : null,
            )}
          </nav>
        </section>
      </header>
    </>
  );
}
