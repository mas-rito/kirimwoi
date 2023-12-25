"use client";
import { getData } from "@/services/files";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FileListComponent = () => {
  const session = useSession();
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

  const handleCheckAll = () => {
    setChecked(!checked);
    if (!checked) {
      // If not checked, set all items as selected
      setSelectedItems((data ?? []).map((item: { id: string }) => item.id));
    } else {
      // If checked, clear the selected items
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (itemId: string) => {
    // Toggle the item's selection state
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  return (
    <div className="w-full rounded bg-gray-100 p-3">
      <div className="flex justify-end md:justify-between items-center">
        <h1 className="hidden md:block text-2xl">Your files</h1>
        <div className="relative my-2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3">
            <Search color="#32363F" />
          </div>
          <input
            type="text"
            className="py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50"
            placeholder="Search for items"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    onChange={handleCheckAll}
                    checked={checked}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item: any) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${item.id}`}
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Link
                      href={`/files/${item.id}`}
                      className="hover:text-blue-600 truncate"
                    >
                      {item.name}
                    </Link>
                  </th>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileListComponent;
