"use client";
import { ArrowLeft, Files, ShieldPlus, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SideNavComponent = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  console.log(pathname);

  const Menus = [
    {
      id: 1,
      title: "Upload",
      icon: Upload,
      path: "/upload",
    },
    {
      id: 2,
      title: "Files",
      icon: Files,
      path: "/files",
    },
    {
      id: 3,
      title: "Upgrade",
      icon: ShieldPlus,
      path: "/upgrade",
    },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20"
        } bg-gray-50 h-screen p-5 pt-8 relative duration-300`}
      >
        <button
          className={`absolute cursor-pointer -right-3 top-9 w-7 bg-gray-50
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        >
          <ArrowLeft color="#4f4f4f" />
        </button>
        <div className="flex gap-x-4 items-center">
          <Image
            src="/icons/kirimwoi.svg"
            width={50}
            height={50}
            alt="logo"
            className={`shadow-custom duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-primary origin-left font-semibold text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Kirimwoi
          </h1>
        </div>
        <ul className="pt-6 flex flex-col gap-1">
          {Menus.map((menu) => (
            <li key={menu.id}>
              <Link
                href={menu.path}
                className={`flex rounded-md p-3 cursor-pointer hover:bg-light-white hover:bg-gray-200 text-gray-700 text-sm items-center gap-x-4 ${
                  pathname === menu.path && "bg-gray-200"
                }`}
              >
                <menu.icon size={20} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-h-screen flex-1 p-7 relative">{children}</div>
    </div>
  );
};

export default SideNavComponent;
