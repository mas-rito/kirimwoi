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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(
          `http://localhost:3000/api/files?email=${session.data?.user?.email}`
        );
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session.data?.user?.email]);

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

  return (
    <>
      <div
        className={`fixed z-10 ${
          checked || selectedItems.length ? "right-2" : "-right-[100%]"
        } top-20 transition-all duration-200 ease-in-out`}
      >
        <SideAction checked={checked} />
      </div>
      <div className="w-full rounded bg-gray-100 p-3">
        <div className="flex justify-end md:justify-between items-center">
          <h1 className="hidden md:block text-2xl">Your files</h1>
          <div className="relative my-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3">
              <Search color="#32363F" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50"
              placeholder="Search for items"
            />
          </div>
        </div>
        <div className="shadow-md sm:rounded-lg">
          <div className="w-full text-sm text-left text-gray-500">
            <div className="flex items-center gap-x-6 text-md text-gray-700 uppercase bg-gray-50 py-3 px-4">
              <input
                id="checkbox-all-search"
                type="checkbox"
                onChange={handleCheckAll}
                checked={checked}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <h1 className="font-semibold">Name</h1>
            </div>
            <div className="h-96 overflow-y-auto">
              {data &&
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
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileListComponent;
