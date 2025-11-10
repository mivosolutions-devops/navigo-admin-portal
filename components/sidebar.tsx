/* eslint-disable react/jsx-key */
"use client";

import React from "react";
import { links } from "@/lib/ui-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { MdLogout } from "react-icons/md";
import useAuth from "@/hooks/useAuth";

const Sidebar = () => {
  const wholePath = usePathname();
  const pathname = wholePath.split("/").slice(0, 2).join("/");

  const { logout } = useAuth();

  return (
    <aside className="w-fit flex flex-col items-center justify-between shadow-3xl">
      <div className="w-full py-2 px-4 rounded-full bg-logo-gradient m-3 mt-6">
        <Logo textVariant="text-2xl" logoSize={{ w: "w-8", h: "h-8" }} />
      </div>
      <div className="w-full flex flex-col gap-2 py-6">
        {links.slice(0, 5).map((link, idx) => {
          const isActive = link.to === pathname;
          return (
            <Link
              href={link.to}
              className={`flex items-center justify-start gap-4 p-3 px-4 text-sm transition-colors cursor-pointer border hover:border-emerald-500 relative hover:text-emerald-500 rounded-full ${
                isActive
                  ? "text-emerald-500 border-emerald-500"
                  : "text-gray-700 border-white"
              }`}
              key={idx}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="">{link.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="w-full h-full flex flex-col justify-end gap-2 py-6">
        {links.slice(5).map((link, idx) => {
          const isActive = link.to === pathname;
          return (
            <Link
              href={link.to}
              key={idx + 1}
              className={`flex items-center justify-start gap-4 p-3 px-4 text-sm transition-colors cursor-pointer border hover:border-emerald-500 relative hover:text-emerald-500 rounded-full ${
                isActive
                  ? "text-emerald-500 border-emerald-500"
                  : "text-gray-700 border-white"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="">{link.label}</span>
            </Link>
          );
        })}

        <button
          className={`flex items-center justify-start gap-4 p-3 px-4 text-sm transition-colors cursor-pointer border hover:border-emerald-500 relative hover:text-emerald-500 rounded-full text-gray-700 border-white`}
          onClick={() => logout()}
        >
          <span className="text-lg">
            <MdLogout />
          </span>
          <span className="">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
