import React, { useState, useEffect } from "react";

const TaskAssignment = () => {
  const [volunteerId, setVolunteerId] = useState("");
  const [activityId, setActivityId] = useState("");
  const [message, setMessage] = useState("");

  const handleAssign = async () => {
    try {
      const response = await assignTask(volunteerId, activityId);
      setMessage(response.message);
    } catch (error) {
      setMessage("Error assigning task");
      console.error("Error assigning task:", error);
    }
  };

  return (
    <div>
      <h3>Assign Task</h3>
      <input
        type="text"
        placeholder="Volunteer ID"
        value={volunteerId}
        onChange={(e) => setVolunteerId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Activity ID"
        value={activityId}
        onChange={(e) => setActivityId(e.target.value)}
      />
      <button onClick={handleAssign}>Assign</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TaskAssignment;
