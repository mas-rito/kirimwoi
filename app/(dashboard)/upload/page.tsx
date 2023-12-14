import UploadFormComponent from "@/app/_components/UploadForm";
import React from "react";

const UploadPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full px-4 py-10">
      <h1 className="text-lg text-center md:text-xl lg:text-2xl">
        Start <span className="font-semibold text-primary">upload</span> your
        file and <span className="font-semibold text-primary">share</span> it.
      </h1>
      <UploadFormComponent />
    </div>
  );
};

export default UploadPage;
