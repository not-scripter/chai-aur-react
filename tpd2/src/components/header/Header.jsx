import React, { useState } from "react";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../Button";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.authStatus);
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
      slug: "/",
      active: authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Account",
      slug: "/account",
      active: authStatus,
    },
  ];
  const [mobNav, setmobNav] = useState(false);
  return (
    <header>
      <section className=" relative h-12 w-full grid col-span-2 sm:flex bg-zinc-950/20 px-4 py-2 gap-4">
          <div className="flex justify-between z-30">
            <Button className="p-2">S</Button>
            <Logo />
            <Button
              onClick={() => setmobNav((prev) => !prev)}
              className="visible sm:hidden w-8 h-8 p-0"
            >
              {!mobNav ? "M" : "C"}
            </Button>
          </div>
          <nav
            className={`${mobNav ? "visible" : "hidden"} z-20 absolute pt-14 sm:visible bg-zinc-950/20 text-white backdrop-blur flex flex-col gap-2  px-4 w-full h-dvh`}
          >
            {navItems.map((items) =>
              items.active ? (
                <NavLink
                  onClick={() => setmobNav(false)}
                  key={items.slug}
                  to={items.slug}
                  className={({ isActive }) =>
                    [
                      isActive
                        ? "bg-orange-500 text-black"
                        : "bg-zinc-800 text-white",
                      "h-fit px-4 py-1 text-center rounded-full shadow hover:bg-orange-500 hover:text-black",
                    ].join(" ")
                  }
                >
                  {items.name}
                </NavLink>
              ) : null,
            )}
          </nav>
      </section>
    </header>
  );
}
