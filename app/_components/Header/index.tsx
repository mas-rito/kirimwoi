"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeaderComponent = () => {
  const { status } = useSession();

  return (
    <header className="flex fixed top-0 z-50 w-full h-20 items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-sm">
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
        <div className="flex items-center gap-4">
          {status === "authenticated" ? (
            <button
              className="hidden md:block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-opacity-90 focus:outline-none w-auto"
              type="button"
              onClick={() => signOut()}
            >
              Logout
            </button>
          ) : (
            <button
              className="hidden md:block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-opacity-90 focus:outline-none w-auto"
              type="button"
              onClick={() =>
                signIn("google", { callbackUrl: "/", redirect: false })
              }
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
