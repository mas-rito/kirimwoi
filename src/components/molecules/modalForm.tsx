"use client"

import React from "react"
import Link from "next/link"

import { CheckCircle2, X } from "lucide-react"

type ModalWrapperProps = {
  isShow: boolean
  children: React.ReactNode
}

type ModalFormProps = {
  closeModal: () => void
  url: string
}

export const ModalWrapper = ({ isShow, children }: ModalWrapperProps) => {
  return (
    <div
      className={`${isShow ? "visible opacity-100" : "invisible opacity-0"} fixed left-0 top-0 z-50 bg-black/20 backdrop-blur transition-opacity`}
    >
      {children}
    </div>
  )
}

export const ModalForm = ({ closeModal, url }: ModalFormProps) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="relative rounded-lg bg-white shadow">
        <button
          type="button"
          onClick={closeModal}
          className="absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
        >
          <X />
        </button>
        <div className="p-4 text-center md:p-5">
          <CheckCircle2 size={48} color="#16a34a" className="mx-auto" />
          <h3 className="mb-2 mt-4 text-lg font-normal text-gray-800">
            File uploaded successfully
          </h3>
          <p className="mb-5 text-gray-400">
            Wanna share it with your friends?
          </p>

          <button
            type="button"
            onClick={closeModal}
            className="me-2 rounded-lg border border-gray-200 bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-800"
          >
            No, thanks
          </button>

          <Link
            href={`/files/${url}`}
            onClick={closeModal}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white"
          >
            Yes, Kirimin!
          </Link>
        </div>
      </div>
    </div>
  )
}
