import { deleteData } from "@/lib/firebase/services";
import { Info, Pencil, Trash2 } from "lucide-react";
import React from "react";

interface DataItem {
  id: string;
  fileRef: string;
}

interface SideActionProps {
  checked: boolean;
  selectedItems: DataItem[];
}

const SideAction = ({ checked, selectedItems }: SideActionProps) => {
  const handleDelete = () => {
    deleteData("files", selectedItems);
  };

  return (
    <div className="flex gap-x-2">
      <button
        type="button"
        disabled={checked}
        className="rounded-full shadow hover:bg-gray-100 p-2 disabled:opacity-50"
      >
        <Info color="#32363F" />
      </button>
      <button
        type="button"
        disabled={checked}
        className="rounded-full shadow hover:bg-gray-100 p-2 disabled:opacity-50"
      >
        <Pencil color="#FF9800" />
      </button>
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
