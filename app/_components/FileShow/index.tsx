"use client";
import { Eye, EyeOff, File } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const FileShowComponent = ({ data }: { data: any }) => {
  const [isReveal, setIsReveal] = useState(false);
  const seePasword = () => {
    setIsReveal(!isReveal);
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
            <h1 className="truncate">{data.name}</h1>
          </div>
          <div className="flex gap-3 text-gray-800 mb-2">
            <h2 className="font-semibold">File Size :</h2>
            <h1 className="truncate">
              {Number(data.size / (1024 * 1024)).toFixed(2)} MB
            </h1>
          </div>
          <div className="flex gap-3 text-gray-800 mb-2">
            <h2 className="font-semibold">File Type :</h2>
            <h1 className="truncate">{data.type}</h1>
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
        <a href={data.url} download={data.name}>
          <button className="w-full bg-primary text-white py-3 rounded mt-2">
            Download
          </button>
        </a>
      </div>
    </div>
  );
};

export default FileShowComponent;
