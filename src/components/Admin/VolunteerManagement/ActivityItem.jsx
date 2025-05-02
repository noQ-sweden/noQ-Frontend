import React, { useState } from "react";
import PropTypes from "prop-types";
import AxiosNoqApi from "../../../api/AxiosNoqApi";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
// import Volunteerheader from "../../Header/Volunteerheader";

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date
    .toLocaleString("sv-SE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/ kl(?= \d{2}:\d{2})/, "")
    .replace(/(\d{1,2}) (\w{3}) (\d{4}), (\d{2}:\d{2})/, "$1 $2 $3 kl $4");
};

export default function ActivityItem({ activity, onEdit, onDelete, onStatusChange }) {
  const [showModal, setShowModal] = useState(false);
  const [activityDetails, setActivityDetails] = useState(activity);
  const [loading, setLoading] = useState(false);

  const fetchActivityDetails = async (id) => {
    try {
      setLoading(true);
      const response = await AxiosNoqApi.get(`/api/admin/activities/${id}`);
      setActivityDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch activity details", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    fetchActivityDetails(activity.id);
    setShowModal(true);
  };

  const bookedCount = activityDetails.volunteers?.filter(v => v.status === "booked").length || 0;
  const requestedCount = activityDetails.volunteers?.filter(v => v.status === "requested").length || 0;
  const total = bookedCount + requestedCount;

  const bookedPercent = total ? (bookedCount / total) * 100 : 0;
  const requestedPercent = total ? (requestedCount / total) * 100 : 0;

  return (
    <>
      <div className="bg-white rounded-xl p-4 shadow-sm border mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{activity.title}</h3>
        <p
          onClick={handleOpenModal}
          className="text-sm text-green-800 underline cursor-pointer mb-1"
        >
          {activity.description}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          📅 {formatDateTime(activity.start_time)} → {formatDateTime(activity.end_time)}
        </p>
        {activity?.volunteers?.length > 0 ? (
          <p className="text-sm text-gray-700">
            👤 {activity.volunteers[0].first_name} {activity.volunteers[0].last_name}
          </p>
        ) : (
          <p className="text-sm italic text-gray-400">👤 Volontär saknas</p>
        )}
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => onStatusChange?.(activity, "completed")}
            className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded hover:bg-green-200"
          >
            Klar
          </button>
          <button onClick={() => onEdit(activity)} className="text-sm font-medium">
            Redigera
          </button>
          <button onClick={() => onDelete(activity.id)} className="text-sm font-medium text-red-600">
            Ta bort
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl relative space-y-4 mt-6 mb-10">
            {/* <Volunteerheader /> */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ×
            </button>

            <div className="border-b-2 border-gray-300 pb-6 pt-4 mx-[-1.5rem]">
              <h2 className="text-xl font-bold text-center text-black">
                {activityDetails.title || "Ingen tittle tillgänglig"}
              </h2>
            </div>

            {loading ? (
              <p className="text-center py-10 text-gray-500">Laddar detaljer...</p>
            ) : (
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-between mb-4 border-b border-gray-300 px-2 pb-4">
                  <h2 className="font-semibold">Uppdrag detaljer</h2>
                  <button className="px-6 pb-3 py-2 border-2 font-semibold border-green-500 rounded-full hover:bg-green-100 w-[100px] text-green-800">
                    Handla
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <h2>Datum</h2>
                  <h2>Tid</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 border-b border-gray-300 px-2 pb-4">
                  <p>{formatDateTime(activityDetails.start_time)}</p>
                  <p>{formatDateTime(activityDetails.end_time)}</p>
                </div>

                <div className="border-b border-gray-300 px-2 pb-4">
                  <h2 className="mb-2">Samlingsplats</h2>
                  <p className="text-gray-600">{activityDetails.samlingplats}</p>
                </div>

                <div className="border-b border-gray-300 px-2 pb-4">
                  <h2 className="mb-2">Address</h2>
                  <p className="text-gray-600">{activityDetails.address}</p>
                </div>

                <div className="border-b border-gray-300 px-2 pb-4">
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <h2>Samordnare</h2>
                    <h2>Tel</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <p className="text-gray-600">{activityDetails.samordnare}</p>
                    <p className="text-gray-600">{activityDetails.tel}</p>
                  </div>
                </div>

                <div className="border-b border-gray-300 px-2 pb-4">
                  <h2 className="mb-2">Viktig info</h2>
                  <p className="text-gray-600">{activityDetails.viktigInfo}</p>
                </div>

                {/* Progress Bar */}
                <div className="border-b border-gray-300 px-2 pb-4">
                  <h2 className="p-4 font-semibold">Volontärer</h2>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden my-4">
                    <div className="h-full flex text-xs font-semibold">
                      <div
                        className="bg-green-500 text-white flex items-center justify-center"
                        style={{ width: `${bookedPercent}%` }}
                      >
                        {bookedCount > 0 && `${bookedCount} Booked`}
                      </div>
                      <div
                        className="bg-yellow-400 text-black flex items-center justify-center"
                        style={{ width: `${requestedPercent}%` }}
                      >
                        {requestedCount > 0 && `${requestedCount} Requested`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Volunteers List */}
                {activityDetails.volunteers?.length > 0 ? (
                  <div className="px-2 space-y-3">
                    <div className="grid grid-cols-3 gap-4 font-semibold text-sm border-b pb-2">
                      <h2>Namn</h2>
                      <h2>Tel</h2>
                      <h2>E-post</h2>
                    </div>
                    {activityDetails.volunteers.map((volunteer) => (
                      <div key={volunteer.id} className="grid grid-cols-3 gap-4 text-sm">
                        <Link
                          to={`/admin/volunteers/${volunteer.id}`}
                          state={{  volunteer: volunteer,
                            activities: activityDetails, }}
                          className="text-green-700 "
                        >
                          {volunteer.first_name} {volunteer.last_name}
                        </Link>
                        <p className="flex items-center text-gray-800">
                          <BsTelephone className="mr-1 text-gray-600" />
                          {volunteer.phone}
                        </p>
                        <p className="flex items-center text-gray-800">
                          <CiMail className="mr-1 text-gray-600" />
                          {volunteer.email}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm">Inga volontärer tilldelade</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

ActivityItem.propTypes = {
  activity: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onStatusChange: PropTypes.func,
};
