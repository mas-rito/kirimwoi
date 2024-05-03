"use client"

import React from "react"
import Link from "next/link"

import { signIn, useSession } from "next-auth/react"

import CopyrightComponent from "../Copyright"

export const HeroComponent = () => {
  const { status } = useSession()

  return (
    <section
      className="bg-gray-50 bg-repeat"
      style={{ backgroundImage: "url(/grid.svg)" }}
    >
      <div className="mx-auto flex h-screen max-w-screen-xl items-center px-4 py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Terkirim dengan Mudah,
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Diterima dengan Cepat!
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Memudahkan untuk mengirim dan berbagi file melalui tautan.
            Memberikan pengalaman berbagi file yang cepat, sederhana, dan
            efisien.
          </p>

          <div className="mt-8 flex justify-center">
            {status !== "loading" ? (
              status === "unauthenticated" ? (
                <button
                  type="button"
                  onClick={() => {
                    signIn("google", {
                      callbackUrl: "/upload",
                      redirect: false,
                    })
                  }}
                  className="w-auto rounded-md bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-opacity-90 focus:outline-none focus:ring"
                >
                  Kirim woi!
                </button>
              ) : (
                <Link
                  className="w-auto rounded-md bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-opacity-90 focus:outline-none focus:ring"
                  href="/upload"
                >
                  Kirim woi!
                </Link>
              )
            ) : (
              <div className="h-10 w-40 animate-pulse rounded-lg bg-gray-200" />
            )}
          </div>
        </div>
      </div>
      <div className="traslate-y-1/2 absolute bottom-5 left-0 right-0">
        <CopyrightComponent />
      </div>
    </section>
  )
}
