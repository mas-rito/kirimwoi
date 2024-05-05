import React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { getData } from "@/services/files"

import { Copyright } from "@/components/atoms/copyright"
import FileShowComponent from "@/components/FileShow"
import NotFoundComponent from "@/components/NotFound"

export const metadata: Metadata = {
  title: "KirimWoi - Download Your Files",
  description:
    "KirimWoi makes it easy for you to send and share files with friends through links, providing a fast, simple, and efficient file-sharing experience.",
  icons: "/icons/kirimwoi.svg",
  keywords:
    "file sharing, easy sharing, quick file transfer, link sharing, email sharing, efficient file sharing",
  authors: [{ name: "KirimWoi", url: "https://www.kirimwoi.cloud" }],
  openGraph: {
    title: "KirimWoi - Easy to share your files",
    description:
      "KirimWoi makes it easy for you to send and share files with friends through links, providing a fast, simple, and efficient file-sharing experience.",
    url: "https://kirimwoi.cloud",
    siteName: "KirimWoi",
    images: [
      {
        url: "https://kirimwoi.cloud/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
}

const FileShow = async ({ params }: { params: { id: string } }) => {
  const file = await getData(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/files?id=${params.id}`
  )

  return (
    <div
      className="flex min-h-screen flex-col justify-between px-6 md:px-10 lg:px-14"
      style={{ backgroundImage: "url(/grid.svg)" }}
    >
      <Link
        className="my-2 flex w-fit items-center rounded-full bg-gray-50 py-1 pe-4 ps-2 text-primary shadow md:my-4 lg:mt-6"
        href="/"
      >
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
      <div className="flex justify-center">
        {file.status === 200 ? (
          <FileShowComponent data={file.data} />
        ) : (
          <NotFoundComponent />
        )}
      </div>
      <div className="mx-auto my-4">
        <Copyright />
      </div>
    </div>
  )
}

export default FileShow
