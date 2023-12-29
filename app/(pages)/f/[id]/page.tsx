import CopyrightComponent from "@/app/_components/Copyright";
import FileShowComponent from "@/app/_components/FileShow";
import { getData } from "@/services/files";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import React from "react";

const FileShow = async ({ params }: { params: { id: string } }) => {
  const file = await getData(
    `${process.env.NEXT_LOCAL_DOMAIN}/api/files?id=${params.id}`
  );

  return (
    <div
      className="relative flex justify-center items-center h-screen px-14"
      style={{ backgroundImage: "url(/grid.svg)" }}
    >
      <Link
        className="absolute left-6 top-8 flex items-center text-primary bg-gray-50 rounded-full shadow py-1 ps-2 pe-4"
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
      <FileShowComponent data={file.data} />
      <CopyrightComponent />
    </div>
  );
};

export default FileShow;
