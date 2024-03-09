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
    {
      name: "Account",
      slug: "/account",
      active: authStatus,
    },
  ];
  const [mobNav, setmobNav] = useState(false)
  return (
     <header>
        <section className="grid col-span-2 sm:flex">
          <Logo />
        <Button onClick={() => setmobNav(prev => !prev)} className="visible sm:hidden">Menu</Button> 
          <nav className={`${mobNav ? 'visible' : 'hidden'} sm:visible text-white`}>
            {navItems.map((items) =>
              items.active ? (
                <NavLink 
                onClick={() => setmobNav(false)}
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
  );
}
