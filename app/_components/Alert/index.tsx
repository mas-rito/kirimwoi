"use client";
import { AlertCircle, X } from "lucide-react";
import React from "react";
import { RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "@/lib/redux/slices/errorSlices";

const AlertComponent = () => {
  const isError = useSelector((state: RootState) => state.isError.isError);
  const dispatch = useDispatch();

  return (
    <div
      id="alert-2"
      className={`absolute ${
        isError ? "top-1" : "-top-full"
      } w-2/3 flex items-center gap-x-2 p-4 mb-4 text-red-800 rounded-lg bg-red-50 shadow-sm transition-all duration-300 ease-in-out`}
      role="alert"
    >
      <AlertCircle color="#dc2626" />
      <div className="ms-3 text-sm font-medium truncate">{isError}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
        onClick={() => dispatch(setError(""))}
      >
        <X color="#dc2626" />
      </button>
    </div>
  );
};

export default AlertComponent;
