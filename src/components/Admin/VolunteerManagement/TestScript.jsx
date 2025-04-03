import React, { useState, useEffect } from "react";cd
import axios from "../../../api/AxiosNoqApi";

const VolunteerTestPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [volunteersRes, tasksRes] = await Promise.all([
          axios.get("/api/volunteer/guest/list"),

          axios.get("/api/admin/volunteer/tasks"),
        ]);

        setVolunteers(volunteersRes.data);
        setTasks(tasksRes.data);
      } catch (error) {
        console.error("Error fetching Available tasks:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Volunteers Test Page</h2>

      <h3>Volunteers</h3>
      <ul>
        {volunteers.map((volunteer) => (
          <li key={volunteer.id}>{volunteer.name}</li>
        ))}
      </ul>

      <h3>Available Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.acticity_title} - {task.status} - {task.volunteer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerTestPage;
