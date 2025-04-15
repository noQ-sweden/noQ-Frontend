import React, { useEffect, useState } from "react";
import axios from "../../../api/AxiosNoqApi";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const TaskAssignment = ({ onStatusChange }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/admin/volunteer/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChanges = async (taskId, newStatus) => {
    try {
      await axios.patch(`/api/admin/volunteer/tasks/${taskId}`, {
        status: newStatus,
      });
      toast.success("Status uppdaterad!");
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  return (
    <div>
      <h2> 📋 Uppgiftstilldelning</h2>
      {tasks.length === 0 ? (
        <p>Inga uppgifter tilldelade ännu.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <p>
              <strong>{task.volunteer} - ✓</strong>
              <strong>{task.activity_title}</strong>
            </p>
            <p>{task.status}</p>
            <label>
              Ändra Status:
              <select
                value={task.status}
                onChange={(e) => handleStatusChanges(task.id, e.target.value)}
              >
                <option value="pending">Väntande</option>
                <option value="accepted">Accepterad</option>
                <option value="declined">Avslutad</option>
              </select>
            </label>
          </div>
        ))
      )}
    </div>
  );
};

TaskAssignment.propTypes = {
  onStatusChange: PropTypes.func,
};

export default TaskAssignment;
