import React from "react";
import Logo from "../Logo";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const services = [
    {
      name: "ServiceOne",
      slug: "",
      active: authStatus,
    },
    {
      name: "ServiceTwo",
      slug: "",
      active: authStatus,
    },
  ];
  const connect = [
    {
      name: "X",
      slug: "https://x.com",
    },
    {
      name: "Youtube",
      slug: "https://youtube.com",
    },
  ];
  return (
    <footer className="fixed bottom-0 bg-zinc-950 text-white flex flex-col px-4 py-4">
      <Logo />
      <section>
        <h1 className="font-semibold">Services</h1>
        <div className="flex flex-col">
          {services.map((item) => (
            <NavLink to={item.slug} key={item.name}>
              {item.name}
            </NavLink>
          ))}
        </div>
      </section>
      <section>
        <h1 className="font-semibold">Connect</h1>
        <div className="flex flex-col">
          {connect.map((item) => (
            <Link to={item.slug} key={item.name}>
              {item.name}
            </Link>
          ))}
        </div>
      </section>
    </footer>
  );
}
