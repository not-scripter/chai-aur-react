import React, { useState } from "react";
import { Button, Container, Logo, LogoutBtn } from "../index.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const [navToggle, setnavToggle] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);
  const navItems = useSelector((state) => state.nav.navItems);
  const authItems = useSelector((state) => state.nav.authItems);

  return (
    <header
      className={`relative grid bg-zinc-200 text-black w-full shadow touch-none
   ${navToggle ? "h-[100dvh] fixed" : ""}
   `}
    >
      <Container>
        <div className="flex items-center justify-between w-full h-fit px-2 py-1">
          <Link to="/">
            <Logo width="250px" />
          </Link>
          <Button
            onClick={() => setnavToggle((prev) => !prev)}
            className="bg-fuchsia-500 text-white"
          >
            {navToggle ? "Close" : "Menu"}
          </Button>
        </div>

        <nav
          className={`w-full h-[85%] bottom-0 flex flex-col justify-between
  ${navToggle ? "visible" : "hidden"}
   `}
        >
          <ul className="w-full grid px-2 py-4 gap-2">
            {authStatus
              ? navItems.map((item) => (
                  <li key={item.slug}>
                    <Button
                      onClick={() => {
                        navigate(item.slug);
                        setnavToggle(false);
                      }}
                      className="inline-block rounded-full hover:bg-zinc-800 hover:text-white w-full py-2 items-center justify-center"
                    >
                      {item.name}
                    </Button>
                  </li>
                ))
              : null}
          </ul>

          <ul className="w-full grid gap-2">
            {!authStatus ? (
              authItems.map((item) => (
                <li key={item.slug}>
                  <Button
                    onClick={() => {
                      navigate(item.slug);
                      setnavToggle(false);
                    }}
                    className="inline-block rounded-full bg-blue-700 text-white hover:bg-blue-950 hover:text-white w-full py-2 items-center justify-center"
                  >
                    {item.name}
                  </Button>
                </li>
              ))
            ) : (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
