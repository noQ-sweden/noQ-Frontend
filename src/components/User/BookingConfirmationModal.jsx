import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function BookingConfirmationModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm relative flex flex-col items-center p-8 text-center">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes className="text-xl" />
                </button>

                {/* Check Icon */}
                <div className="mb-6">
                    <FaCheck className="text-6xl text-green-800" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Bokat!</h2>

                {/* Message */}
                <p className="text-gray-600 font-medium">
                    De finns nu under Mina uppdrag
                </p>
            </div>
        </div>
    );
}
