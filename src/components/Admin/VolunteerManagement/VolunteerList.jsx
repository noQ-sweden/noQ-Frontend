import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";

VolunteerList.propTypes = {
  volunteers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      phone: PropTypes.string,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  activityDetails: PropTypes.object.isRequired,
};

export function VolunteerList({ volunteers, activityDetails }) {
  return (
    <div>
      {volunteers?.length > 0 ? (
        <div className="px-2 space-y-3">
          <div className="grid grid-cols-3 gap-4 font-semibold text-sm border-b pb-2">
            <h2>Namn</h2>
            <h2>Tel</h2>
            <h2>E-post</h2>
          </div>
          {volunteers.map((volunteer) => (
            <div key={volunteer.id} className="grid grid-cols-3 gap-4 text-sm">
              <Link
                to={`/admin/volunteers/${volunteer.id}`}
                state={{
                  volunteer: volunteer,
                  activities: activityDetails,
                }}
                className="text-green-700 "
              >
                {volunteer.first_name} {volunteer.last_name}
              </Link>
              <p className="flex items-center text-gray-800">
                <BsTelephone className="mr-1 text-gray-600" />
                {volunteer.phone || "saknas"}
              </p>
              <p className="flex items-center text-gray-800">
                <CiMail className="mr-1 text-gray-600" />
                {volunteer.email}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-sm">
          Inga volontärer tilldelade
        </p>
      )}
    </div>
  );
}
