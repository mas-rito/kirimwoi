"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ArrowLeft, Files, ShieldPlus, Upload } from "lucide-react"

import SideInfo from "../SideInfo"

const SideNavComponent = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

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
  ]

  return (
    <>
      <div className="my-5 flex justify-between px-6 md:my-6 md:px-10 lg:my-8 lg:justify-end lg:px-14">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          <svg
            className="h-6 w-6"
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
        className={`fixed left-0 top-0 z-30 h-screen w-full bg-gray-900 bg-opacity-40 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:-translate-x-full`}
      ></div>
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transition-transform  ${
          open ? "translate-x-0" : "-translate-x-full"
        } -translate-x-full lg:translate-x-0`}
      >
        <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4">
          <ul className="space-y-2 font-medium">
            <li className="mb-3 flex items-center gap-x-4 py-3">
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
                className={`origin-left text-xl font-semibold text-primary duration-200`}
              >
                Kirimwoi
              </h1>
            </li>
            {Menus.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={menu.path}
                  onClick={() => setOpen(!open)}
                  className={`hover:bg-light-white flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 ${
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
  )
}

export default SideNavComponent
