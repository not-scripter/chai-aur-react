import React from "react";
import { NavLink, useParams } from "react-router-dom";

export default function ProfileTabs({ children }) {
  const { slug } = useParams();
  const tabItems = [
    {
      name: "Posts",
      slug: `/${slug}/posts`,
    },
    {
      name: "Replies",
      slug: `/${slug}/replies`,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <section className="bg-preprimary overflow-x-scroll flex gap-2 px-2 py-2 rounded-full shadow">
        {tabItems.map((item) => (
          <NavLink
            to={item.slug}
            className={({ isActive }) =>
              [
                isActive
                  ? "bg-secondary text-primary"
                  : "bg-primary text-secondary",
                "rounded-full px-6 py-1 font-semibold flex items-center justify-center shadow active:bg-opacity-80 hover:outline hover:outline-secondary/20 hover:outline-4",
              ].join(" ")
            }
          >
            {item.name}
          </NavLink>
        ))}
      </section>
      <section>{children}</section>
    </div>
  );
}
