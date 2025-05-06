export default function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
      <div className="modal-overlay">
        <div className="modal-content animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Confirm Action
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Confirm
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }