import React from "react";
import PropTypes from "prop-types";

VolunteerProgressBar.propTypes = {
  requestedCount: PropTypes.number.isRequired,
  bookedCount: PropTypes.number.isRequired,
  requestedPercent: PropTypes.number.isRequired,
  bookedPercent: PropTypes.number.isRequired,
};

export function VolunteerProgressBar({
  requestedCount,
  bookedCount,
  requestedPercent,
  bookedPercent,
}) {
  return (
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
  );
}
