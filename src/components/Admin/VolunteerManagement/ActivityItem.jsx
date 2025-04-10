import React from "react";

const ActivityItem = ({ activity, onEdit, onDelete }) => {
  <li>
    <strong>{activity.title}</strong> - {activity.description}
    <br />
    🕰️ {new Date(activity.start_time).toLocaleString()} →
    {new Date(activity.end_time).toLocaleString()}
    <br />
    <button onClick={() => onEdit(activity)}>✏️ Edit</button>
    <button onClick={() => onDelete(activity.id)}>🚮 Delete</button>
    <hr />
  </li>;
};

export default ActivityItem;
