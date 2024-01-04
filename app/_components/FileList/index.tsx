"use client";
import { getData } from "@/services/files";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideAction from "./SideAction";

interface DataItem {
  id: string;
  fileRef: string;
}

const FileListComponent = () => {
  const session = useSession();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (session.data?.user?.email) {
          const result = await getData(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/files?email=${session.data?.user?.email}`
          );
          setData(result.data);
          setLoading(false);
          setChecked(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setRefreshData(false);
  }, [session.data?.user?.email, refreshData]);

  const filteredData = data.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckAll = () => {
    setChecked(!checked);
    if (!checked) {
      // If not checked, set all items as selected
      setSelectedItems((data ?? []).map((item: DataItem) => item));
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (item: DataItem) => {
    // Toggle the item's selection state
    if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const conditional = selectedItems.length > 0 || filteredData.length > 0;

  return (
    <div className="w-full rounded bg-gray-100 p-3">
      <div className="flex justify-end md:justify-between items-center">
        <h1 className="hidden md:block text-2xl">Your files</h1>
        <div className="relative flex justify-end w-4/5 md:w-fit my-2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3">
            <Search color="#32363F" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 ps-10 ms-auto text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none bg-gray-50"
            placeholder="Search for items"
          />
        </div>
      </div>
      <div className="shadow-md sm:rounded-lg">
        <div className="w-full text-sm text-left text-gray-500">
          <div className="relative flex items-center gap-x-6 text-md text-gray-700 uppercase bg-gray-50 py-3 px-4">
            <input
              id="checkbox-all-search"
              type="checkbox"
              onChange={handleCheckAll}
              checked={checked}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
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
              <div className="flex justify-center mt-4">
                <svg
                  className="animate-spin h-6 w-6 text-gray-800"
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
                  className="flex items-center gap-x-6 bg-white border-b hover:bg-gray-50 py-3 px-4"
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
                      })
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />

                  <Link
                    href={`/files/${item.id}`}
                    className="hover:text-blue-600 font-medium text-gray-900 w-[80%] truncate"
                  >
                    {item.name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center mt-4">No files found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileListComponent;
