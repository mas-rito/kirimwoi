import { setIsModalOpen } from "@/lib/redux/slices/modalSlice";
import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const ModalComponent = ({
  onReset,
  url,
}: {
  onReset: () => void;
  url: string;
}) => {
  const dispatch = useDispatch();
  const handleOnclick = () => {
    onReset();
    dispatch(setIsModalOpen(false));
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen backdrop-blur bg-black/20"
    >
      <div className="relative bg-white rounded-lg shadow">
        <button
          type="button"
          onClick={handleOnclick}
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
        >
          <X />
        </button>
        <div className="p-4 md:p-5 text-center">
          <CheckCircle2 size={48} color="#16a34a" className="mx-auto" />
          <h3 className="mt-4 mb-2 text-lg font-normal text-gray-800">
            File uploaded successfully
          </h3>
          <p className="text-gray-400 mb-5">
            Wanna share it with your friends?
          </p>

          <button
            type="button"
            onClick={handleOnclick}
            className="text-gray-800 bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 me-2"
          >
            No, thanks
          </button>

          <Link
            href={`/files/${url}`}
            onClick={handleOnclick}
            className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Yes, Kirimin!
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ModalComponent;
