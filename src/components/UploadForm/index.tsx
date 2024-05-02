"use client"

import React, { useEffect, useState } from "react"

import { getData } from "@/services/files"
import { revalidateData } from "@/services/revalidate"
import { AnimatePresence } from "framer-motion"
import { File } from "lucide-react"
import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux"

import { fileUpload } from "@/lib/firebase/services"
import { setError } from "@/lib/redux/slices/errorSlices"
import { setIsModalOpen } from "@/lib/redux/slices/modalSlice"

import ModalComponent from "../Modal"
import ProgressBar from "../ProgressBar"

interface DataItem {
  id: string
  fileRef: string
  size: number
}

type YourUserType = {
  maxsize: number
}

const UploadFormComponent = () => {
  const session = useSession()
  const dispatch = useDispatch()

  const [file, setFile] = useState<File | undefined>(undefined)
  const [drag, setDrag] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  const [data, setData] = useState<DataItem[]>([])
  const [refreshData, setRefreshData] = useState(false)
  const modal = useSelector((state: any) => state.isModalOpen.isOpen)
  const handleError = (error: string) => dispatch(setError(error))

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.data?.user?.email) {
          const result = await getData(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/files?email=${session.data?.user?.email}`
          )
          setData(result.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
    setRefreshData(false)
  }, [session.data?.user?.email, refreshData])

  const totalFileSize = data.reduce((sum, item) => sum + item.size, 0)

  const limitSizeFile =
    (session.data?.user as YourUserType)?.maxsize - totalFileSize

  const handleModal = ({
    isOpen: { status, url },
  }: {
    isOpen: { status: boolean; url: string }
  }) => dispatch(setIsModalOpen({ status, url }))

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTarget = e.target.files?.[0]

    if (fileTarget && fileTarget.size > 105000000) {
      dispatch(setError("File is too big"))
    } else {
      setFile(fileTarget)
    }
  }

  const handleDragStart = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDrag(true)
  }

  const handleDragEnd = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDrag(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDrag(false)

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0]

      if (droppedFile.size > 105000000) {
        dispatch(setError("File is too big"))
      } else {
        setFile(droppedFile)
      }
    }
  }

  const handleReset = () => {
    setFile(undefined)
    setProgress(0)
  }

  const handleSubmit = async () => {
    if (file && file.size > 105000000) {
      dispatch(setError("File is too big"))
    } else if (file && file.size > limitSizeFile) {
      dispatch(setError("You reached the limit file size"))
    } else {
      await fileUpload(
        file,
        session.data?.user,
        setProgress,
        handleError,
        handleModal
      )
      revalidateData()
      setRefreshData(true)
    }
  }

  return (
    <>
      <AnimatePresence>
        {modal.status && (
          <ModalComponent onReset={handleReset} url={modal.url} />
        )}
      </AnimatePresence>

      <form className="mt-6 flex w-full flex-col items-center justify-center">
        <label
          htmlFor="dropzone-file"
          onDragOver={handleDragStart}
          onDragLeave={handleDragEnd}
          onDrop={handleDrop}
          className={`flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 ${
            drag && "border-primary bg-primary bg-opacity-10"
          }`}
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            {file ? (
              <>
                <File size={48} color="#32363F" />
                <h1 className="text-md my-2 text-center font-medium text-gray-600">
                  {file.name}
                </h1>
                <p className="text-xs text-gray-500">
                  {file.type} - {Number(file.size / (1024 * 1024)).toFixed(2)}{" "}
                  MB
                </p>
              </>
            ) : (
              <>
                <svg
                  className="mb-4 h-8 w-8 text-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold text-primary">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF, docx, xlsx, mp4
                </p>
              </>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {progress > 0 && <ProgressBar progress={progress} />}
        <button
          className="mt-5 rounded-full bg-primary px-16 py-3 text-lg font-medium text-white shadow hover:bg-opacity-90 focus:outline-none focus:ring disabled:bg-gray-500"
          disabled={!file}
          type="button"
          onClick={handleSubmit}
        >
          Upload
        </button>
      </form>
    </>
  )
}

export default UploadFormComponent
