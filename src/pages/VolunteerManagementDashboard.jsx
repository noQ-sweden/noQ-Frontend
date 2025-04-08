import React, { useState, useEffect } from "react";
import axios from "axios";
import ActivityForm from "../components/Admin/VolunteerManagement/ActivityForm";
import ActivityList from "../components/Admin/VolunteerManagement/ActivityList";
import TaskAssignment from "../components/Admin/VolunteerManagement/TaskAssignment";

const VolunteerManagementDashboard = () => {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const res = await axios.get("/api/admin/activities/");
      console.log("Full response:", res);
      console.log("Raw data received:", res.data);
      setActivities(res.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    console.log("Activities state:", activities);
  }, [activities]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        Admin:📋 Management Volunteer Activities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActivityForm onCreated={fetchActivities} />
        <ActivityList activities={activities} />
        <div className="md:col-span-2">
          <TaskAssignment onStatusChange={fetchActivities} />
        </div>
      </div>
    </div>
  );
};

export default VolunteerManagementDashboard;
