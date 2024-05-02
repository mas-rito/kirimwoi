"use client"

import React, { useState } from "react"
import Image from "next/image"

import { LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

const SideInfo = () => {
  const [open, setOpen] = useState(false)
  const session = useSession()

  return session.data ? (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-4 rounded-full bg-gray-100 py-1 pe-1 ps-1 md:ps-4"
      >
        <h3 className="hidden truncate md:block">{session.data?.user?.name}</h3>
        <Image
          src={session.data?.user?.image || "/icons/profile.png"}
          alt={session.data?.user?.name || "profile"}
          className="rounded-full"
          width={40}
          height={40}
        />
      </button>
      <div
        className={`absolute right-0 z-10 mt-1 ${open ? "block" : "hidden"}`}
      >
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 shadow-sm"
        >
          Logout
          <LogOut color="#32363F" />
        </button>
      </div>
    </div>
  ) : (
    <div className="h-11 w-40 animate-pulse rounded-full bg-gray-200" />
  )
}

export default SideInfo
