import React from "react";
import VolunteerList from "../components/Admin/VolunteerManagement/VolunteerList";
import TaskList from "../components/Admin/VolunteerManagement/TaskList";
import TeskAssigment from "../components/Admin/VolunteerManagement/TaskAssignment";
import TaskStatus from "../components/Admin/VolunteerManagement/TaskStatus";

const VolunteerManagementDashboard = () => {
  const { group } = useUser();

  if (!["admin", "host"].includes(group)) {
    return <p> You are not authorized to view this page</p>;
  }

  return (
    <div>
      <h1>Volunteer Management Dashboard</h1>
      <VolunteerList />
      <TaskList />
      <TeskAssigment />
      <TaskStatus />
    </div>
  );
};

export default VolunteerManagementDashboard;
