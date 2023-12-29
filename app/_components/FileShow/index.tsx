"use client";
import axios from "axios";
import { Eye, EyeOff, File } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const FileShowComponent = ({ data }: { data: any }) => {
  const [isReveal, setIsReveal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const seePasword = () => {
    setIsReveal(!isReveal);
  };

  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data]);

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "downloaded-file";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-2 w-full md:w-10/12">
      <div className="flex flex-col items-center justify-center bg-gray-200 rounded w-full lg:w-3/5 p-2">
        {data.type === "image/jpeg" || data.type === "image/png" ? (
          <Image
            src={data.url}
            alt={data.name}
            width={300}
            height={300}
            className="rounded w-full lg:w-fit"
          />
        ) : (
          <>
            <File size={48} color="#32363F" />
            <h1 className="my-2 text-md font-medium text-gray-600 text-center">
              {data.name}
            </h1>
            <p className="text-xs text-gray-500 text-center">
              {data.type} - {Number(data.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </>
        )}
      </div>
      <div className="bg-gray-100 p-4 rounded w-full">
        <div className="w-full bg-gray-50 py-3 px-4 rounded-md">
          <div className="flex gap-3 text-gray-800 mb-2">
            <h2 className="font-semibold">File Name :</h2>
            <h1 className="truncate w-3/5 lg:w-4/5">{data.name}</h1>
          </div>
          <div className="flex gap-3 text-gray-800 mb-2">
            <h2 className="font-semibold">File Size :</h2>
            <h1 className="truncate w-3/5 lg:w-4/5">
              {Number(data.size / (1024 * 1024)).toFixed(2)} MB
            </h1>
          </div>
          <div className="flex gap-3 text-gray-800 mb-2">
            <h2 className="font-semibold">File Type :</h2>
            <h1 className="truncate w-3/5 lg:w-4/5">{data.type}</h1>
          </div>
        </div>
        <div className="flex justify-between items-end gap-6 w-full mt-2 bg-gray-50 py-1 px-4 rounded-md">
          <div className="w-full">
            <label htmlFor="password" className="text-gray-800">
              File Password
            </label>
            <div className="relative">
              <input
                type={isReveal ? "text" : "password"}
                id="password"
                className="w-full p-2 border rounded focus:outline-gray-400"
                onChange={(e) => setInputPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2"
                onClick={seePasword}
              >
                {isReveal ? (
                  <EyeOff color="#4b5563" />
                ) : (
                  <Eye color="#4b5563" />
                )}
              </button>
            </div>
          </div>
        </div>
        {inputPassword === data.password ? (
          <button
            onClick={() => handleDownload(data.url, data.name)}
            className="w-full bg-primary text-white py-3 rounded mt-2"
          >
            Download
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-primary text-white py-3 rounded mt-2 disabled:bg-gray-500"
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
};

export default FileShowComponent;
