"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const SideInfo = () => {
  const session = useSession();

  return (
    <div className="absolute z-20 top-4 right-8">
      <button
        type="button"
        className="flex gap-4 items-center rounded-full bg-gray-50 px-4"
      >
        <h3 className="truncate">{session.data?.user?.name}</h3>
        <Image
          src={session.data?.user?.image || "/icons/profile.png"}
          alt={session.data?.user?.name || "profile"}
          className="rounded-full"
          width={50}
          height={50}
        />
      </button>
    </div>
  );
};

export default SideInfo;
