import React from "react";
import Image from "next/image";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  propertyTitle: string;
  propertyImage: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  propertyTitle,
  propertyImage,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
        <p className="text-lg font-semibold mb-4">You Delete This Property!</p>
        <Image src={propertyImage} alt={propertyTitle} width={150} height={150} className="mx-auto rounded-md" />
        <p className="my-4">{propertyTitle}</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 w-[100px] bg-[#e74141] text-white rounded-md hover:bg-red-400"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 w-[100px] bg-gray-300 text-black rounded-md hover:bg-gray-200"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
