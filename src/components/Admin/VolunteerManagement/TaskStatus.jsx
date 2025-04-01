import React, { useState, useEffect } from "react";

const TaskStatus = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTaskStatus()
      .then((data) => {
        setStatuses(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching statuses:", error));
  }, []);

  if (loading) return <p>Loading statuses...</p>;

  return (
    <div>
      <h3>Task Status</h3>
      <ul>
        {statuses.map((status) => (
          <li key={status.id}>
            {status.name} - {status.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskStatus;
