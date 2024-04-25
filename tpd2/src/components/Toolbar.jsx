import React from "react";
import { NavLink } from "react-router-dom";
import {
  AddSvg,
  HomeSvg,
  PostSvg,
  ReplySvg,
  SavesSvg,
} from "../assets";

export default function Toolbar() {
  const ToolItems = [
    {
      slug: "/",
      name: "Home",
      icon: <HomeSvg />,
    },
    {
      slug: `/posts`,
      name: "Posts",
      icon: <PostSvg />,
    },
    {
      slug: `/add-post`,
      name: "Add Post",
      icon: <AddSvg />,
    },
    {
      slug: `/replies`,
      name: "Replies",
      icon: <ReplySvg />,
    },
    {
      slug: `/saves`,
      name: "Saved",
      icon: <SavesSvg />,
    },
  ];
  return (
    <>
      <div className="z-30 flex justify-evenly w-full h-fit fixed bottom-0 bg-primary/80 backdrop-blur-md">
        {ToolItems.map((item) => (
          <NavLink
            to={item.slug}
            key={item.slug}
            className={({ isActive }) =>
              [
                isActive && "shadow-secondary/50 shadow-md",
                "flex flex-col items-center justify-center p-2 rounded-full fill-fuchsia-500 stroke-fuchsia-500",
              ].join(" ")
            }
          >
            {item.icon}
            <h1 className="text-xs font-semibold text-secondary/50">
              {item.name}
            </h1>
          </NavLink>
        ))}
      </div>
    </>
  );
}
