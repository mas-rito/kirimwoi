import { deleteData } from "@/lib/firebase/services";
import { Info, Pencil, Trash2 } from "lucide-react";
import React from "react";

interface DataItem {
  id: string;
  fileRef: string;
}

interface SideActionProps {
  selectedItems: DataItem[];
}

const SideAction = ({ selectedItems }: SideActionProps) => {
  const handleDelete = () => {
    deleteData("files", selectedItems);
  };

  return (
    <div className="flex gap-x-2">
      {/* <button
        type="button"
        disabled={selectedItems.length > 1}
        className="rounded-full shadow hover:bg-gray-100 p-2 disabled:hidden"
      >
        <Info color="#32363F" />
      </button>
      <button
        type="button"
        disabled={selectedItems.length > 1}
        className="rounded-full shadow hover:bg-gray-100 p-2 disabled:hidden"
      >
        <Pencil color="#FF9800" />
      </button> */}
      <button
        type="button"
        className="rounded-full shadow hover:bg-gray-100 p-2"
        onClick={handleDelete}
      >
        <Trash2 color="#DC2626" />
      </button>
    </div>
  );
};

export default SideAction;
