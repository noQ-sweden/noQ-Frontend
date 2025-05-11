import React from "react";
import ActivityItem from "./ActivityItem";
import PropTypes from "prop-types";

const ActivityList = ({ activities, onEdit, onDelete, onStatusChange }) => {
  if (!Array.isArray(activities)) {
    console.error("Activities is not an array:", activities);
    return <p>⚠️ Inga aktiviteter tillgängliga.</p>;
  }
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onStatusChange: PropTypes.func,
};

export default ActivityList;
