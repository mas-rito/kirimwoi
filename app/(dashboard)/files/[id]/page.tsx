import FileInfo from "@/app/_components/FileInfo";
import { getData } from "@/services/files";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KirimWoi - Share Your Files",
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

const SingleFile = async ({ params }: { params: { id: string } }) => {
  const file = await getData(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/files?id=${params.id}`
  );
  const fileShortUrl = process.env.NEXT_PUBLIC_DOMAIN + "/f/" + file.data.id;

  return (
    <div className="flex justify-center px-6 md:px-10 lg:px-14">
      <FileInfo data={file.data} fileUrl={fileShortUrl} />
    </div>
  );
};

export default SingleFile;
