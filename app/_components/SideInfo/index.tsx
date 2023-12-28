"use client";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

const SideInfo = () => {
  const [open, setOpen] = useState(false);
  const session = useSession();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex gap-4 items-center rounded-full bg-gray-50 pl-4"
      >
        <h3 className="truncate">{session.data?.user?.name}</h3>
        <Image
          src={session.data?.user?.image || "/icons/profile.png"}
          alt={session.data?.user?.name || "profile"}
          className="rounded-full"
          width={40}
          height={40}
        />
      </button>
      <div className={`absolute z-10 right-0 ${open ? "block" : "hidden"}`}>
        <button
          onClick={() => signOut()}
          className="flex gap-2 mt-2 bg-gray-100 px-4 py-2 rounded-md shadow-sm"
        >
          Logout
          <LogOut color="#32363F" />
        </button>
      </div>
    </div>
  );
};

export default SideInfo;
