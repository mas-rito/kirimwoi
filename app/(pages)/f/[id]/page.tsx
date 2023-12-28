import FileShowComponent from "@/app/_components/FileShow";
import { getData } from "@/services/files";
import React from "react";

const FileShow = async ({ params }: { params: { id: string } }) => {
  const file = await getData(
    `${process.env.NEXT_LOCAL_DOMAIN}/api/files?id=${params.id}`
  );

  return (
    <div className="flex justify-center items-center h-screen px-14">
      <FileShowComponent data={file.data} />
    </div>
  );
};

export default FileShow;
