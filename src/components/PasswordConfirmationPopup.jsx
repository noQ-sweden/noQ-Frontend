import React, { useState } from "react";
import PropTypes from "prop-types";

const PasswordConfirmationPopup = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  /* Handle password input changes */
  const handleChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatchError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatchError(false);
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    onConfirm(password);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Ändra Löseord</h2>
        <input
          type="password"
          name="password"
          autoComplete="off"
          value={password}
          onChange={handleChange}
          placeholder="Skriv in det nya löseordet"
          // required={!isEditing}
          className="border rounded border-gray-400 py-1 px-3 w-full"
        />

        <input
          type="password"
          name="confirmPassword"
          autoComplete="off"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Bekräfta lösenord"
          // required={!isEditing}
          className="border rounded border-gray-400 py-1 px-3 w-full"
        />
        {passwordMatchError && (
          <p className="text-red-500">Lösenorden matchar inte.</p>
        )}

        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded"
            onClick={onClose}
          >
            Avbryt
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Bekräfta
          </button>
        </div>
      </div>
    </div>
  );
};

PasswordConfirmationPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default PasswordConfirmationPopup;
