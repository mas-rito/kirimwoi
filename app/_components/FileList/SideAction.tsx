import { Info, Pencil, Trash2 } from "lucide-react";
import React from "react";

const SideAction = ({ checked }: { checked: boolean }) => {
  return (
    <div className="flex flex-col gap-y-1 bg-white rounded-full p-0.5 shadow">
      <button
        type="button"
        disabled={checked}
        className="rounded-full hover:bg-gray-100 p-2 disabled:opacity-50"
      >
        <Info color="#32363F" />
      </button>
      <button
        type="button"
        disabled={checked}
        className="rounded-full hover:bg-gray-100 p-2 disabled:opacity-50"
      >
        <Pencil color="#FF9800" />
      </button>
      <button type="button" className="rounded-full hover:bg-gray-100 p-2">
        <Trash2 color="#DC2626" />
      </button>
    </div>
  );
};

export default SideAction;
