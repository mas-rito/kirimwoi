"use client"

import React, { useState } from "react"
import Image from "next/image"

import axios from "axios"
import { Eye, EyeOff, File } from "lucide-react"

const FileShowComponent = ({ data }: { data: any }) => {
  const [isReveal, setIsReveal] = useState(false)
  const [inputPassword, setInputPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCanDownload, setIsCanDownload] = useState(false)

  console.log(data.password)

  const seePasword = () => {
    setIsReveal(!isReveal)
  }

  const handleDownload = async (url: string, fileName: string) => {
    setIsLoading(true)
    try {
      const response = await axios.get(url, { responseType: "blob" })
      const blob = new Blob([response.data])

      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = blobUrl
      link.download = fileName || "downloaded-file"

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      setIsLoading(false)
    } catch (error) {
      console.error("Error downloading file:", error)
    }
  }

  const handleSubmitPassword = () => {
    if (inputPassword === data.password) {
      setIsCanDownload(true)
    } else {
      setIsCanDownload(false)
    }
  }

  const conditionalType =
    data.type === "image/jpeg" ||
    data.type === "image/png" ||
    data.type === "image/gif" ||
    data.type === "image/webp"

  const conditional = (conditionalType && isCanDownload) || data.password === ""

  return (
    <div className="flex w-full flex-wrap gap-2 md:w-10/12 lg:flex-nowrap">
      <div className="flex w-full flex-col items-center justify-center rounded bg-gray-200 p-2 lg:w-3/5">
        {conditional ? (
          <Image
            src={data.url}
            alt={data.name}
            width={300}
            height={300}
            className="w-full rounded lg:w-fit"
          />
        ) : (
          <>
            <File size={48} color="#32363F" />
            <h1 className="text-md my-2 text-center font-medium text-gray-600">
              {data.name}
            </h1>
            <p className="text-center text-xs text-gray-500">
              {data.type} - {Number(data.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </>
        )}
      </div>
      <div className="w-full rounded bg-gray-100 p-4">
        <div className="w-full rounded-md bg-gray-50 px-4 py-3">
          <div className="mb-2 flex gap-3 text-gray-800">
            <h2 className="font-semibold">File Name :</h2>
            <h1 className="w-3/5 truncate lg:w-4/5">{data.name}</h1>
          </div>
          <div className="mb-2 flex gap-3 text-gray-800">
            <h2 className="font-semibold">File Size :</h2>
            <h1 className="w-3/5 truncate lg:w-4/5">
              {Number(data.size / (1024 * 1024)).toFixed(2)} MB
            </h1>
          </div>
          <div className="mb-2 flex gap-3 text-gray-800">
            <h2 className="font-semibold">File Type :</h2>
            <h1 className="w-3/5 truncate lg:w-4/5">{data.type}</h1>
          </div>
        </div>
        {data.password && (
          <div className="mt-2 flex w-full items-end justify-between gap-6 rounded-md bg-gray-50 px-4 py-1">
            <div className="w-full">
              <label htmlFor="password" className="text-gray-800">
                File Password
              </label>
              <div className="flex w-full items-center gap-2">
                <div className="relative w-full">
                  <input
                    type={isReveal ? "text" : "password"}
                    id="password"
                    className="w-full rounded border p-2 focus:outline-gray-400"
                    onChange={(e) => setInputPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
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
                  className="rounded bg-primary px-5 py-2 text-white"
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        )}
        {isCanDownload || data.password === "" ? (
          <button
            onClick={() => handleDownload(data.url, data.name)}
            className="mt-2 flex w-full items-center justify-center rounded bg-primary py-3 text-white outline-none"
          >
            {isLoading ? (
              <svg
                className="h-6 w-6 animate-spin text-white"
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
            className="mt-2 w-full rounded bg-primary py-3 text-white disabled:bg-gray-500"
          >
            Download
          </button>
        )}
      </div>
    </div>
  )
}

export default FileShowComponent
