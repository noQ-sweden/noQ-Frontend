import React from "react";
import {
    FaTimes,
    FaCalendarAlt,
    FaRegClock,
    FaMapMarkerAlt,
    FaUser,
    FaPhone,
    FaUsers,
    FaCheck,
} from "react-icons/fa";
import dayjs from "dayjs";

export default function ActivityModal({
    isOpen,
    onClose,
    activity,
    onBook,
    isRegistered,
}) {
    if (!isOpen || !activity) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative flex flex-col max-h-[90vh]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                >
                    <FaTimes className="text-xl" />
                </button>

                {/* Header */}
                <div className="p-6 pb-2">
                    <h2 className="text-xl font-bold text-green-900 pr-8">
                        {activity.title}
                    </h2>
                    {activity.organization && (
                        <p className="text-sm text-gray-600 font-medium">
                            {activity.organization}
                        </p>
                    )}
                </div>

                {/* Scrollable Content */}
                <div className="p-6 pt-2 overflow-y-auto flex-grow">
                    {/* Description */}
                    <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                        {activity.description}
                    </p>

                    {/* Important Info Box */}
                    {activity.optional_instructions && (
                        <div className="border border-red-300 rounded-full px-4 py-2 text-red-600 text-sm font-medium text-center mb-6 bg-red-50">
                            {activity.optional_instructions}
                        </div>
                    )}

                    {/* Details List */}
                    <div className="space-y-4 text-sm text-gray-800">
                        {/* Date */}
                        <div className="flex items-start gap-3">
                            <FaCalendarAlt className="text-gray-600 mt-0.5" />
                            <div>
                                <span className="font-bold">Datum: </span>
                                <span>
                                    {dayjs(activity.start_time).format("D MMMM YYYY")}
                                </span>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-start gap-3">
                            <FaRegClock className="text-gray-600 mt-0.5" />
                            <div>
                                <span className="font-bold">Tid: </span>
                                <span>
                                    {dayjs(activity.start_time).format("HH.mm")} -{" "}
                                    {dayjs(activity.end_time).format("HH.mm")}
                                </span>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-gray-600 mt-0.5" />
                            <div>
                                <span className="font-bold">Adress: </span>
                                <span>{activity.location || "Plats saknas"}</span>
                            </div>
                        </div>

                        {/* Meeting Place (Mocked if missing) */}
                        {/* <div className="flex items-start gap-3">
              <FaUsers className="text-gray-600 mt-0.5" />
              <div>
                <span className="font-bold">Samlingsplats: </span>
                <span>Receptionen</span>
              </div>
            </div> */}

                        {/* Phone (Mocked if missing) */}
                        {/* <div className="flex items-start gap-3">
              <FaPhone className="text-gray-600 mt-0.5" />
              <div>
                <span className="font-bold">Telefonnummer: </span>
                <span>08-348598</span>
              </div>
            </div> */}

                        {/* Contact Person */}
                        {activity.contact_person && (
                            <div className="flex items-start gap-3">
                                <FaUser className="text-gray-600 mt-0.5" />
                                <div>
                                    <span className="font-bold">Samordnare: </span>
                                    <span>{activity.contact_person}</span>
                                </div>
                            </div>
                        )}

                        {/* Available Spots (Mocked) */}
                        {/* <div className="flex items-start gap-3">
              <FaCheck className="text-gray-600 mt-0.5" />
              <div>
                <span className="font-bold">Antal lediga platser: </span>
                <span>4/5</span>
              </div>
            </div> */}
                    </div>
                </div>

                {/* Footer with Action Button */}
                <div className="p-6 pt-4 border-t border-gray-100">
                    {!isRegistered ? (
                        <button
                            onClick={() => onBook(activity.id)}
                            className="w-full bg-green-900 text-white py-3 rounded-full font-bold text-base hover:bg-green-800 transition-colors shadow-md"
                        >
                            Boka
                        </button>
                    ) : (
                        <button
                            onClick={() => onBook(activity.id)} // This will trigger cancel if registered
                            className="w-full bg-red-700 text-white py-3 rounded-full font-bold text-base hover:bg-red-800 transition-colors shadow-md"
                        >
                            Avboka
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
