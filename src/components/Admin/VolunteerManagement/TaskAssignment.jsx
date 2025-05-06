import React, { useEffect, useState } from "react";
import axiosNoqApi from "../../../api/AxiosNoqApi";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import TaskAssignmentSection from "./TaskAssignmentSection";

const TaskAssignment = ({ onStatusChange }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axiosNoqApi.get("/api/admin/volunteer/tasks");
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
      await axiosNoqApi.patch(`/api/admin/volunteer/tasks/${taskId}`, {
        status: newStatus,
      });
      toast.success("Status uppdaterad!");
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error assigning task:", error);
      toast.error("Kunde inte uppdatera status.");
      console.log("💥 Error details:", error.response?.data);
    }
  };

  return (
    <TaskAssignmentSection tasks={tasks} onStatusChange={handleStatusChanges} />
  );
};

TaskAssignment.propTypes = {
  onStatusChange: PropTypes.func,
};

export default TaskAssignment;
