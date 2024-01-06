"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SideInfo from "../SideInfo";

const HeaderComponent = () => {
  const { status } = useSession();
  console.log(status);

  return (
    <header className="flex fixed top-0 z-50 w-full h-20 bg-gray-50 bg-opacity-75 items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="flex flex-1 md:mx-4 lg:mx-10 items-center justify-between">
        <Link className="flex items-center text-primary" href="/">
          <Image
            src={"/icons/kirimwoi.svg"}
            alt="kirimwoi"
            className="shadow-custom"
            width={80}
            height={80}
          />
          <span className="ml-2 text-xl md:text-2xl lg:text-3xl font-bold">
            Kirimwoi
          </span>
        </Link>
        {status !== "loading" ? (
          status === "authenticated" ? (
            <SideInfo />
          ) : (
            <button
              className="hidden md:block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-opacity-90 focus:outline-none w-auto"
              type="button"
              onClick={() =>
                signIn("google", { callbackUrl: "/upload", redirect: false })
              }
            >
              Login
            </button>
          )
        ) : (
          <div className="w-36 h-11 bg-gray-200 rounded-lg animate-pulse" />
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
