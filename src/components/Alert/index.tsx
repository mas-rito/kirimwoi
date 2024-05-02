"use client"

import React from "react"

import { AlertCircle, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"

import { setError } from "@/lib/redux/slices/errorSlices"
import { RootState } from "@/lib/redux/store"

const AlertComponent = () => {
  const isError = useSelector((state: RootState) => state.isError.isError)
  const dispatch = useDispatch()

  return (
    <div
      id="alert-2"
      className={`absolute ${
        isError ? "top-0" : "-top-full"
      } mb-4 flex w-2/3 items-center gap-x-2 rounded-lg bg-red-50 p-4 text-red-800 shadow-sm transition-all duration-300 ease-in-out`}
      role="alert"
    >
      <AlertCircle color="#dc2626" />
      <div className="ms-3 truncate text-sm font-medium">{isError}</div>
      <button
        type="button"
        className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-200 focus:ring-2 focus:ring-red-400"
        onClick={() => dispatch(setError(""))}
      >
        <X color="#dc2626" />
      </button>
    </div>
  )
}

export default AlertComponent
