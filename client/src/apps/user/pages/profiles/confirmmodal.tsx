import React from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure?",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center h-screen justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-base sm:text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4 sm:mb-6">{message}</p>

        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 w-full sm:w-auto"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? "Cancelling..." : "Yes, Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;