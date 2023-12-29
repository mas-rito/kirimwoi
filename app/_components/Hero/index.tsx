"use client";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import { signIn, useSession } from "next-auth/react";
import CopyrightComponent from "../Copyright";

export const metadata: Metadata = {
  title: "Kirimwoi | Share your files",
  description: "Take easy to share your files",
};

const HeroComponent = () => {
  const { status } = useSession();

  return (
    <section
      className="bg-gray-50 bg-repeat"
      style={{ backgroundImage: "url(/grid.svg)" }}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Terkirim dengan Mudah,
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Diterima dengan Cepat!
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Memudahkan untuk mengirim dan berbagi file dengan melalui tautan
            atau email, memberikan pengalaman berbagi file yang cepat,
            sederhana, dan efisien.
          </p>

          <div className="mt-8 flex justify-center">
            {status === "unauthenticated" ? (
              <button
                type="button"
                onClick={() => {
                  signIn("google", { callbackUrl: "/upload", redirect: false });
                }}
                className="rounded-md bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-opacity-90 focus:outline-none focus:ring w-auto"
              >
                Kirim woi!
              </button>
            ) : (
              <Link
                className="rounded-md bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-opacity-90 focus:outline-none focus:ring w-auto"
                href="/upload"
              >
                Kirim woi!
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 traslate-y-1/2 left-0 right-0">
        <CopyrightComponent />
      </div>
    </section>
  );
};

export default HeroComponent;
