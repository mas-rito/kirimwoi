"use client";
import axios from "axios";
import { Eye, EyeOff, File } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const FileShowComponent = ({ data }: { data: any }) => {
  const [isReveal, setIsReveal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCanDownload, setIsCanDownload] = useState(false);
  const seePasword = () => {
    setIsReveal(!isReveal);
  };

  const handleDownload = async (url: string, fileName: string) => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleSubmitPassword = () => {
    if (inputPassword === data.password) {
      setIsCanDownload(true);
    } else {
      setIsCanDownload(false);
    }
  };

  const conditionalType =
    data.type === "image/jpeg" ||
    data.type === "image/png" ||
    data.type === "image/gif" ||
    data.type === "image/webp";

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-2 w-full md:w-10/12">
      <div className="flex flex-col items-center justify-center bg-gray-200 rounded w-full lg:w-3/5 p-2">
        {conditionalType && isCanDownload ? (
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
        {data.password && (
          <div className="flex justify-between items-end gap-6 w-full mt-2 bg-gray-50 py-1 px-4 rounded-md">
            <div className="w-full">
              <label htmlFor="password" className="text-gray-800">
                File Password
              </label>
              <div className="w-full flex items-center gap-2">
                <div className="relative w-full">
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
                <button
                  type="button"
                  onClick={handleSubmitPassword}
                  className="bg-primary text-white py-2 px-5 rounded"
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        )}
        {isCanDownload ? (
          <button
            onClick={() => handleDownload(data.url, data.name)}
            className="w-full flex justify-center items-center bg-primary text-white py-3 rounded mt-2 outline-none"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Download"
            )}
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
