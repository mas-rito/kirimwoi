"use client"

import React from "react"

import { AlertCircle, X } from "lucide-react"

type Props = {
  isError: string
  setError: React.Dispatch<React.SetStateAction<string>>
}
export const AlertError = ({ isError, setError }: Props) => {
  return (
    <div
      className={`fixed ${
        isError ? "top-6" : "-top-full"
      } mb-4 flex w-2/3 items-center gap-x-2 rounded-lg bg-red-50 p-4 text-red-800 shadow-sm transition-all duration-300 ease-in-out`}
      role="alert"
    >
      <AlertCircle color="#dc2626" />
      <div className="ms-3 truncate text-sm font-medium">{isError}</div>
      <button
        type="button"
        className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-200 focus:ring-2 focus:ring-red-400"
        onClick={() => setError("")}
      >
        <X color="#dc2626" />
      </button>
    </div>
  )
}
