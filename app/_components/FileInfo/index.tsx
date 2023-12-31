"use client";
import { savePassword } from "@/lib/firebase/services";
import { revalidateData } from "@/services/revalidate";
import { Check, Eye, EyeOff, File, Files } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const FileInfo = ({ data, fileUrl }: { data: any; fileUrl: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isReveal, setIsReveal] = useState(false);
  const [password, setPassword] = useState(data.password);
  const [isLoading, setIsLoading] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const seePasword = () => {
    setIsReveal(!isReveal);
  };

  const HandleSavePassword = () => {
    if (password || password !== data.password) {
      setIsLoading(true);
      savePassword({ id: data.id, password: password, setIsLoading });
      revalidateData();
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-2 w-full md:w-11/12 md:mt-10 lg:mt-20">
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
        <div className="flex justify-between items-center w-full mt-2 bg-gray-50 py-1 px-4 rounded-md">
          <p className="text-gray-800 truncate">{fileUrl}</p>
          <button
            className="hover:bg-gray-100 p-2 rounded"
            type="button"
            onClick={copyToClipboard}
          >
            {isCopied ? <Check color="#16a34a" /> : <Files color="#4b5563" />}
          </button>
        </div>
        <div className="flex justify-between items-end gap-2 w-full mt-2 bg-gray-50 py-1 px-4 rounded-md">
          <div className="w-full">
            <label htmlFor="password" className="text-gray-800">
              File Password
            </label>
            <div className="relative">
              <input
                type={isReveal ? "text" : "password"}
                id="password"
                className="w-full p-2 border rounded focus:outline-gray-400"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
          <button
            type="button"
            className="flex justify-center items-center bg-primary text-white hover:bg-primary/90 py-2 px-4 rounded disabled:bg-gray-500"
            disabled={isLoading || password === data.password}
            onClick={HandleSavePassword}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
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
              "save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileInfo;
