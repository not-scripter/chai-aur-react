import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { PeoplesSvg } from "../assets";
import { useSelector } from "react-redux";

export default function Toolbar() {
  const { profileData } = useSelector(state => state.auth)
  const ToolItems = [
    {
      slug: "/",
      name: "Home",
      icon: <PeoplesSvg width="6" />,
    },
    {
      slug: `/${profileData.$id}/posts`,
      name: "Posts",
      icon: <PeoplesSvg width="6" />,
    },
    {
      slug: `/${profileData.$id}/replies`,
      name: "Replies",
      icon: <PeoplesSvg width="6" />,
    },
    {
      slug: `/${profileData.$id}/saved`,
      name: "Saved",
      icon: <PeoplesSvg width="6" />,
    },
  ];
  return (
    <>
      <div className="flex justify-evenly w-full h-fit sticky bottom-0 bg-primary/80 backdrop-blur">
        {ToolItems.map((item) => (
          <NavLink
            to={item.slug}
            key={item.slug}
            className={({ isActive }) =>
              [
                isActive && "shadow-secondary/50 shadow-md",
                "flex flex-col items-center justify-center p-2 rounded-full",
              ].join(" ")
            }
          >
            {item.icon}
            <h1 className="text-sm font-semibold text-secondary/50">{item.name}</h1>
          </NavLink>
        ))}
      </div>
    </>
  );
}
