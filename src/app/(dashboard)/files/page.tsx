import React from "react"
import type { Metadata } from "next"

import FileListComponent from "@/components/FileList"

export const metadata: Metadata = {
  title: "KirimWoi - Your Files",
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

const FilesPage = () => {
  return (
    <div className="relative overflow-hidden px-6 md:px-10 lg:px-14">
      <FileListComponent />
    </div>
  )
}

export default FilesPage
