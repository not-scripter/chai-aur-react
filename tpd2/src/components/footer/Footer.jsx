import React from "react";
import Logo from "../Logo";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const authStatus = useSelector(state => state.auth.authStatus)
  const services = [
    {
      name: "",
      slug: "",
      active: authStatus
    }
  ]
  return (
  <footer className="fixed bottom-0">
      <Logo />
    <section>
        <h1>Services</h1>
        <div> 
          {
            services.map(item => <NavLink to={item.slug} key={item.slug}>{item.name}</NavLink>)
          }
        </div>
    </section>
  </footer>
  )
}
