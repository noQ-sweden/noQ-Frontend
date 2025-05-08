import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

function VolunteerDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const volunteer = state?.volunteer;

  const activities = state?.activities
    ? Array.isArray(state.activities)
      ? state.activities
      : [state.activities]
    : [];

  if (!volunteer) {
    return <div className="text-center text-gray-600 mt-10">No volunteer data available.</div>;
  }

  const upcomingActivities = activities.filter((activity) =>
    activity.volunteers?.some((v) => v.id === volunteer.id)
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto sm:max-w-xl md:max-w-2xl">
      
      <div className="border-b border-gray-300 pb-4 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-black hover:underline text-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Tillbaka</span>
        </button>
      </div>

      {/* Volunteer Name */}
      <h1 className="w-full text-3xl font-bold flex justify-center items-center text-black pt-4 pb-4 border-b border-gray-300">
        {volunteer.first_name} {volunteer.last_name}
      </h1>

      {/* Volunteer Details */}
      <div>
        <h2 className="pb-6 pt-4 border-b font-semibold border-gray-300">Volontär detaljer</h2>
        <div className="flex flex-col sm:flex-row sm:justify-between pb-3 border-b border-gray-300">
          <span className="text-gray-500">Registrerad sedan</span>
          <span>{volunteer.date_joined || "-"}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between pb-3 pt-4 border-b border-gray-300">
          <span className="text-gray-500">Mobilnummer</span>
          <span>{volunteer.phone || "-"}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between pb-3 pt-4 border-b border-gray-300">
          <span className="text-gray-500">E-post</span>
          <span>{volunteer.email || "-"}</span>
        </div>
      </div>

      {/* Avsätta Button */}
      <div className="pb-6 pt-4 flex justify-center items-center border-b border-gray-300">
        <button className="px-6 pb-3 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-100 w-[200px]">
          Avsätta
        </button>
      </div>

      {/* Upcoming Activities */}
      <div className="pb-6 pt-4 border-b border-gray-300">
        <h2 className="text-black font-semibold pb-6 pt-4 border-b border-gray-300">
          Kommande uppdrag
        </h2>
        {upcomingActivities.length > 0 ? (
          <ul className="pt-2 text-gray-800 space-y-4">
            {upcomingActivities.map((activity) => (
              <li key={activity.id} className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-green-700 font-medium">{activity.title}</span>
                <span>{formatDateTime(activity.start_time)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 pt-2">Ingen information tillgänglig</p>
        )}
      </div>

      {/* Show More Button */}
      <div className="px-6 pb-3 pt-6 border-b-4 border-gray-300 flex justify-center items-center">
        <button className="text-center border-b-4 text-green-700 border-green-500 pb-1 hover:text-green-600">
          Visa mer
        </button>
      </div>
    </div>
  );
}

export default VolunteerDetails;
