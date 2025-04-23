import React from "react";
import PropTypes from "prop-types";

export default function VolunteerOverviewItem({ volunteer }) {
  return (
    <div className="flex justify-between items-center p-4 border-b hover:bg-gray-50">
      <div>
        <p className="font-semibold">{volunteer.name}</p>
        <p className="text-sm text-gray-500">{volunteer.email}</p>
      </div>
      <div className="flex item-center gap-4">
        <span className="text-sm text-gray-600 bg-green-100 px-2 py-1 rounded">
          {volunteer.status || "Tillgänglig"}
        </span>
        <span className="text-sm text-gray-600">
          Uppdrag: {volunteer.tasks_assigned ?? 0}
        </span>
      </div>
    </div>
  );
}

VolunteerOverviewItem.propTypes = {
  volunteer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    is_available: PropTypes.bool,
    assigned_activities: PropTypes.array,
    status: PropTypes.string,
    tasks_assigned: PropTypes.number,
  }).isRequired,
};
