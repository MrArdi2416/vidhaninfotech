import React from 'react'


interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg text-center">
      <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this user?</h2>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Yes
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default DeleteModal