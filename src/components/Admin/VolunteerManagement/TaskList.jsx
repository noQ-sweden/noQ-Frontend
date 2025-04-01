import React, { useState, useEffect } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvlibleTasks()
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h3>Task List</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
