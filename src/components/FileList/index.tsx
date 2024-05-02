"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import { getData } from "@/services/files"
import { Search } from "lucide-react"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"

import SideAction from "./SideAction"

interface DataItem {
  id: string
  fileRef: string
  size: number
}

const FileListComponent = () => {
  const session = useSession()
  const [data, setData] = useState<DataItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [checked, setChecked] = useState(false)
  const [selectedItems, setSelectedItems] = useState<DataItem[]>([])
  const [loading, setLoading] = useState(false)
  const [refreshData, setRefreshData] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        if (session.data?.user?.email) {
          const result = await getData(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/files?email=${session.data?.user?.email}`
          )
          setData(result.data)
          setLoading(false)
          setChecked(false)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
    setRefreshData(false)
  }, [session.data?.user?.email, refreshData])

  const filteredData = data.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCheckAll = () => {
    setChecked(!checked)
    if (!checked) {
      // If not checked, set all items as selected
      setSelectedItems((data ?? []).map((item: DataItem) => item))
    } else {
      setSelectedItems([])
    }
  }

  const handleCheckboxChange = (item: DataItem) => {
    // Toggle the item's selection state
    if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      )
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const conditional = selectedItems.length > 0 || filteredData.length > 0

  return (
    <div className="w-full rounded bg-gray-100 p-3">
      <div className="flex items-center justify-end md:justify-between">
        <h1 className="hidden text-2xl md:block">Your files</h1>
        <div className="relative my-2 flex w-4/5 justify-end md:w-fit">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3">
            <Search color="#32363F" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ms-auto w-full rounded-lg border border-gray-300 bg-gray-50 py-2 ps-10 text-sm text-gray-900 focus:outline-none"
            placeholder="Search for items"
          />
        </div>
      </div>
      <div className="shadow-md sm:rounded-lg">
        <div className="w-full text-left text-sm text-gray-500">
          <div className="text-md relative flex items-center gap-x-6 bg-gray-50 px-4 py-3 uppercase text-gray-700">
            <input
              id="checkbox-all-search"
              type="checkbox"
              onChange={handleCheckAll}
              checked={checked}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
            />
            <h1 className="font-semibold">Name</h1>
            {selectedItems.length > 0 ? (
              <div className="absolute right-5">
                <SideAction
                  selectedItems={selectedItems}
                  refreshData={setRefreshData}
                  refreshSelectedItems={setSelectedItems}
                />
              </div>
            ) : null}
          </div>
          <div className="h-96 overflow-y-auto">
            {loading ? (
              <div className="mt-4 flex justify-center">
                <svg
                  className="h-6 w-6 animate-spin text-gray-800"
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
              </div>
            ) : conditional ? (
              filteredData.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center gap-x-6 border-b bg-white px-4 py-3 hover:bg-gray-50"
                >
                  <input
                    id={`checkbox-table-search-${item.id}`}
                    type="checkbox"
                    checked={selectedItems.some(
                      (selectedItem) => selectedItem.id === item.id
                    )}
                    onChange={() =>
                      handleCheckboxChange({
                        id: item.id,
                        fileRef: item.fileRef,
                        size: item.size,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
                  />

                  <Link
                    href={`/files/${item.id}`}
                    className="w-[80%] truncate font-medium text-gray-900 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="mt-4 text-center">No files found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileListComponent
