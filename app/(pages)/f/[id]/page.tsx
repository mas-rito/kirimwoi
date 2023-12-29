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
