"use client"

import React, { useState } from "react"
import Image from "next/image"

import { revalidateData } from "@/services/revalidate"
import { Check, Eye, EyeOff, File, Files } from "lucide-react"

import { savePassword } from "@/lib/firebase/services"

const FileInfo = ({ data, fileUrl }: { data: any; fileUrl: string }) => {
  const [isCopied, setIsCopied] = useState(false)
  const [isReveal, setIsReveal] = useState(false)
  const [password, setPassword] = useState(data.password)
  const [isLoading, setIsLoading] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileUrl)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  const seePasword = () => {
    setIsReveal(!isReveal)
  }

  const HandleSavePassword = () => {
    if (password || password !== data.password) {
      setIsLoading(true)
      savePassword({ id: data.id, password: password, setIsLoading })
      revalidateData()
    } else {
      return
    }
  }

  return (
    <div className="flex w-full flex-wrap gap-2 md:mt-10 md:w-11/12 lg:mt-20 lg:flex-nowrap">
      <div className="flex w-full flex-col items-center justify-center rounded bg-gray-200 p-2 lg:w-3/5">
        {data.type === "image/jpeg" || data.type === "image/png" ? (
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
        <div className="mt-2 flex w-full items-center justify-between rounded-md bg-gray-50 px-4 py-1">
          <p className="truncate text-gray-800">{fileUrl}</p>
          <button
            className="rounded p-2 hover:bg-gray-100"
            type="button"
            onClick={copyToClipboard}
          >
            {isCopied ? <Check color="#16a34a" /> : <Files color="#4b5563" />}
          </button>
        </div>
        <div className="mt-2 flex w-full items-end justify-between gap-2 rounded-md bg-gray-50 px-4 py-1">
          <div className="w-full">
            <label htmlFor="password" className="text-gray-800">
              File Password
            </label>
            <div className="relative">
              <input
                type={isReveal ? "text" : "password"}
                id="password"
                className="w-full rounded border p-2 focus:outline-gray-400"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
          </div>
          <button
            type="button"
            className="flex items-center justify-center rounded bg-primary px-4 py-2 text-white hover:bg-primary/90 disabled:bg-gray-500"
            disabled={isLoading || password === data.password}
            onClick={HandleSavePassword}
          >
            {isLoading ? (
              <svg
                className="h-5 w-5 animate-spin text-white"
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
  )
}

export default FileInfo
