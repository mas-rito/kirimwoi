import AlertComponent from "@/app/_components/Alert";
import UploadFormComponent from "@/app/_components/UploadForm";
import React from "react";

const UploadPage = () => {
  return (
    <div className="relative flex flex-col justify-center items-center px-6 md:px-10 lg:px-14">
      <AlertComponent />
      <h1 className="text-lg text-center md:text-xl lg:text-2xl">
        Start <span className="font-semibold text-primary">upload</span> your
        file and <span className="font-semibold text-primary">share</span> it.
      </h1>
      <UploadFormComponent />
    </div>
  );
};

export default UploadPage;
