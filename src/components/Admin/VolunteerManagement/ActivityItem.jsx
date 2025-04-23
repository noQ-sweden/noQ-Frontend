import React from "react";
import PropTypes from "prop-types";

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
export default function ActivityItem({
  activity,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border mb-4">
      <h3 className="text-lg font-bold text-gray-800 mb-1">{activity.title}</h3>
      <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
      <p className="text-sm text-gray-500 mb-1">
        📅 {formatDateTime(activity.start_time)} →
        {formatDateTime(activity.end_time)}
      </p>
      {activity?.volunteer?.full_name ? (
        <p className="text-sm text-gray-700">
          👤 {activity.volunteer.full_name}
        </p>
      ) : (
        <p className="text-sm italic text-gray-400">👤 Volontär saknas</p>
      )}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onStatusChange?.(activity, "completed")}
          className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded hover:bg-green-200"
        >
          Klar
        </button>
        <button
          onClick={() => onEdit(activity)}
          className="text-sm font-medium"
        >
          Redigera
        </button>
        <button
          onClick={() => onDelete(activity.id)}
          className="text-sm font-medium text-red-600"
        >
          Ta bort
        </button>
      </div>
    </div>
  );
}

ActivityItem.propTypes = {
  activity: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onStatusChange: PropTypes.func,
};
