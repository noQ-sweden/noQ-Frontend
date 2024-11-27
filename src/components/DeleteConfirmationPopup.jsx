import React from "react";
import PropTypes from "prop-types";

const DeleteConfirmationPopup = ({ isOpen, onClose, onConfirm, user }) => {
  if (!isOpen) return null;

  if (!onClose || !onConfirm) {
    console.error(
      "DeleteConfirmationPopup requires onClose and onConfirm props"
    );
    return null;
  }

  return (
    <div className="fixed inset-0 items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Bekräfta radering</h2>
        <p className="text-sm text-gray-600 mb-6">
          Är du säker att du vill radera användare{" "}
          <span className="font-bold">
            {user?.first_name} {user?.last_name}
          </span>
          ? Denna åtgärden kan ej ångras.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded"
            onClick={onClose}
          >
            Avbryt
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Radera
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmationPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmationPopup;
