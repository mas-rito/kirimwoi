import CopyrightComponent from "@/app/_components/Copyright";
import FileShowComponent from "@/app/_components/FileShow";
import { getData } from "@/services/files";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KirimWoi - Download Your Files",
  description:
    "KirimWoi makes it easy for you to send and share files with friends through links, providing a fast, simple, and efficient file-sharing experience.",
  icons: "/icons/kirimwoi.svg",
  keywords:
    "file sharing, easy sharing, quick file transfer, link sharing, email sharing, efficient file sharing",
  authors: [{ name: "KirimWoi", url: "https://www.kirimwoi.cloud" }],
  themeColor: "#ffffff",
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
};

const FileShow = async ({ params }: { params: { id: string } }) => {
  const file = await getData(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/files?id=${params.id}`
  );

  return (
    <div
      className="flex flex-col justify-between min-h-screen px-6 md:px-10 lg:px-14"
      style={{ backgroundImage: "url(/grid.svg)" }}
    >
      <Link
        className="flex items-center w-fit text-primary bg-gray-50 rounded-full shadow my-2 md:my-4 lg:mt-6 py-1 ps-2 pe-4"
        href="/"
      >
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
      <div className="flex justify-center">
        <FileShowComponent data={file.data} />
      </div>
      <div className="flex justify-center my-4">
        <CopyrightComponent />
      </div>
    </div>
  );
};

export default FileShow;
