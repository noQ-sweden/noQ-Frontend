import React from "react";
import PropTypes from "prop-types";

const ActivityItem = ({ activity, onEdit, onDelete }) => {
  return (
    <li className="border p-4 mb-2">
      <strong>{activity.title}</strong> - {activity.description}
      <br />
      🕰️ {new Date(activity.start_time).toLocaleString()} →
      {new Date(activity.end_time).toLocaleString()}
      <br />
      <button onClick={() => onEdit?.(activity)}>✏️ Redigera</button>
      <button onClick={() => onDelete?.(activity.id)}>🚮 Ta bort</button>
      <hr />
    </li>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ActivityItem;
