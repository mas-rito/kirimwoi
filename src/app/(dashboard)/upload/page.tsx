import React from "react"
import type { Metadata } from "next"

import UploadFormComponent from "@/components/organisms/uploadForm"

export const metadata: Metadata = {
  title: "KirimWoi - Upload Your Files",
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

const UploadPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-6 md:px-10 lg:px-14">
      <h1 className="text-center text-lg md:text-xl lg:text-2xl">
        Start <span className="font-semibold text-primary">upload</span> your
        file and <span className="font-semibold text-primary">share</span> it.
      </h1>
      <UploadFormComponent />
    </div>
  )
}

export default UploadPage
