import React from "react";
import ActivityItem from "./ActivityItem";
import PropTypes from "prop-types";

const ActivityList = ({ activities, onEdit, onDelete }) => {
  if (!Array.isArray(activities)) {
    console.error("Activities is not an array:", activities);
    return <p>⚠️ No activities available.</p>;
  }
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ActivityList;
