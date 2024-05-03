"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

import { signIn, signOut, useSession } from "next-auth/react"

import SideInfo from "../SideInfo"

export const HeaderComponent = () => {
  const { status } = useSession()
  console.log(status)

  return (
    <header className="fixed top-0 z-50 flex h-20 w-full items-center gap-8 bg-gray-50 bg-opacity-75 px-4 shadow-sm sm:px-6 lg:px-8">
      <div className="flex flex-1 items-center justify-between md:mx-4 lg:mx-10">
        <Link className="flex items-center text-primary" href="/">
          <Image
            src={"/icons/kirimwoi.svg"}
            alt="kirimwoi"
            className="shadow-custom"
            width={80}
            height={80}
          />
          <span className="ml-2 text-xl font-bold md:text-2xl lg:text-3xl">
            Kirimwoi
          </span>
        </Link>
        {status !== "loading" ? (
          status === "authenticated" ? (
            <SideInfo />
          ) : (
            <button
              className="hidden w-auto rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-opacity-90 focus:outline-none md:block"
              type="button"
              onClick={() =>
                signIn("google", { callbackUrl: "/upload", redirect: false })
              }
            >
              Login
            </button>
          )
        ) : (
          <div className="h-11 w-36 animate-pulse rounded-lg bg-gray-200" />
        )}
      </div>
    </header>
  )
}
