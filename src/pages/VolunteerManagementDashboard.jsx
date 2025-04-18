import React, { useState, useEffect } from "react";
import axios from "axios";
import ActivityForm from "../components/Admin/VolunteerManagement/ActivityForm";
import ActivityList from "../components/Admin/VolunteerManagement/ActivityList";
import TaskAssignment from "../components/Admin/VolunteerManagement/TaskAssignment";
import ActivitetyCalendar from "../components/Admin/VolunteerManagement/ActivityCalendar";
import { toast } from "react-toastify";

const VolunteerManagementDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [activityToEdit, setActivityToEdit] = useState(null);

  const fetchActivities = async () => {
    try {
      const res = await axios.get("/api/admin/activities/");

      setActivities(res.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/activities/${id}`);
      toast.success("Aktivitet raderad!");
      fetchActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleEdit = (activity) => {
    setActivityToEdit(activity);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        Admin:📋 Management Volunteer Activities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActivityForm
          onCreated={fetchActivities}
          activityToEdit={activityToEdit}
          onUpdated={() => {
            fetchActivities();
            setActivityToEdit(null);
          }}
        />
        <ActivityList
          activities={activities}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <div className="md:col-span-2">
          <TaskAssignment onStatusChange={fetchActivities} />
        </div>
        <ActivitetyCalendar activities={activities} />
      </div>
    </div>
  );
};

export default VolunteerManagementDashboard;
