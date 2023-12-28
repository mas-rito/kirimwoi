"use client";
import { ArrowLeft, Files, ShieldPlus, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SideInfo from "../SideInfo";

const SideNavComponent = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
  ];

  return (
    <>
      <div className="flex justify-between lg:justify-end my-5 md:my-6 lg:my-8 px-6 md:px-10 lg:px-14">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
        <SideInfo />
      </div>
      <div
        onClick={() => setOpen(false)}
        className={`fixed top-0 left-0 z-30 w-full h-screen transition-transform bg-gray-900 bg-opacity-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:-translate-x-full`}
      ></div>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform  ${
          open ? "translate-x-0" : "-translate-x-full"
        } -translate-x-full lg:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <li className="flex gap-x-4 items-center py-3 mb-3">
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
                className={`text-primary origin-left font-semibold text-xl duration-200`}
              >
                Kirimwoi
              </h1>
            </li>
            {Menus.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={menu.path}
                  onClick={() => setOpen(!open)}
                  className={`flex items-center p-2 rounded-lg hover:bg-light-white hover:bg-gray-100 text-gray-700 ${
                    pathname === menu.path && "bg-gray-100"
                  }`}
                >
                  <menu.icon />
                  <span className="ms-3">{menu.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideNavComponent;
