import React from "react";
import { useLocation } from "react-router-dom";

function VolunteerDetails() {
  const { state } = useLocation();
  const volunteer = state?.volunteer;
  const activities = state?.activities || [];

  if (!volunteer) {
    return <div>No volunteer data available.</div>;
  }

  // Filter activities where this volunteer is registered
  const upcomingActivities = activities.filter((activity) =>
    activity.volunteers.some((v) => v.id === volunteer.id)
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h1 className="w-full text-3xl flex justify-center items-center text-black pt-4 border-b border-gray-300">
        {volunteer.first_name} {volunteer.last_name}
      </h1>

      <div>
        <h2 className="pb-6 pt-4 border-b border-gray-300 font-semibold">Volontär detaljer</h2>
        <p className="pb-3 border-b border-gray-300">
          <span className="mr-10">Registrerad sedan</span> {volunteer.date_joined || "-"}
        </p>
        <p className="pb-3 pt-4 border-b border-gray-300">
          <span className="mr-10">Mobilnummer</span> {volunteer.phone || "-"}
        </p>
        <p className="pb-3 pt-4 border-b border-gray-300">
          <span className="mr-10">E-post</span> {volunteer.email || "-"}
        </p>
      </div>

      <div className="pb-6 pt-4 flex justify-center items-center border-b border-gray-300">
        <button className="px-6 pb-3 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-100 w-[200px]">
          Avsätta
        </button>
      </div>

      {/* Upcoming assignments */}
      <div className="pb-6 pt-4 border-b border-gray-300">
        <h2 className="text-black font-semibold">Kommande uppdrag</h2>
        {upcomingActivities.length > 0 ? (
          <ul className="pt-2 list-disc list-inside text-gray-800">
            {upcomingActivities.map((activity) => (
              <li key={activity.id}>{activity.title}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 pt-2">Ingen information tillgänglig</p>
        )}
      </div>

      <div className="px-6 pb-3 pt-6 border-b-4 border-gray-300 flex justify-center items-center">
        <button className="text-center border-b-4 border-green-500 pb-1 hover:text-green-600">
          Visa mer
        </button>
      </div>
    </div>
  );
}

export default VolunteerDetails;
