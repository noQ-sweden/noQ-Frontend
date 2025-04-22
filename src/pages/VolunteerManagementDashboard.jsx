import React, { useState, useEffect } from "react";
import axiosNoqApi from "../api/AxiosNoqApi";
import ActivityForm from "../components/Admin/VolunteerManagement/ActivityForm";
import ActivityList from "../components/Admin/VolunteerManagement/ActivityList";
import TaskAssignment from "../components/Admin/VolunteerManagement/TaskAssignment";
import ActivitetyCalendar from "../components/Admin/VolunteerManagement/ActivityCalendar";
import { toast } from "react-toastify";
import AdminDashboardLayout from "./AdminDashboardLayout";
import DropdownSort from "../components/Admin/VolunteerManagement/SortDropdown";
import FilterDropdown from "../components/Admin/VolunteerManagement/FilterDropdown";
import VolunteerOverviewList from "../components/Admin/VolunteerManagement/VolunteerOverviewList";
import Modal from "../components/Common/Modal";

const VolunteerManagementDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [sortOption, setSortOption] = useState("title-asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [activityToEdit, setActivityToEdit] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const fetchActivities = async () => {
    try {
      const res = await axiosNoqApi.get("/api/admin/activities/");

      setActivities(res.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
      console.warn("Error fetching activities:", error);
      setActivities([]);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosNoqApi.delete(`/api/admin/activities/${id}`);
      toast.success("Aktivitet raderad!");
      fetchActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleEdit = (activity) => {
    setActivityToEdit(activity);
  };
  const now = new Date();
  const filterByStatus = (activity) => {
    if (filterStatus === "ongoing") return new Date(activity.end_time) >= now;
    if (filterStatus === "completed") return new Date(activity.end_time) < now;
    return true; // "all" case
  };

  const sortedActivities = [...activities].sort((a, b) => {
    if (sortOption === "title-asc") {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === "date-asc") {
      return new Date(a.start_time) - new Date(b.start_time);
    }
    if (sortOption === "date-desc") {
      return new Date(b.start_time) - new Date(a.start_time);
    }
    return 0;
  });

  const filteredActivities = sortedActivities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      filterByStatus(activity)
  );
  return (
    <AdminDashboardLayout>
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">
          Admin:📋 Management Volunteer Activities
        </h2>
        <div className="flex flex-row md:flex-row md:items-center gap-2 mb-4">
          <DropdownSort value={sortOption} onChange={setSortOption} />
          <FilterDropdown value={filterStatus} onChange={setFilterStatus} />
          <VolunteerOverviewList />
          <input
            type="text"
            placeholder="Sök efter aktivitet..."
            className="border border-gray-300 rounded w-full md:w-64 mb-4"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>

        {filteredActivities.length === 0 && (
          <p className="text-gray-500 italic m-4">
            Inga aktiviteter matchade din sökning
          </p>
        )}
        <button
          onClick={() => {
            setActivityToEdit(null);
            setShowModal(true);
          }}
          className="bg-green-700 text-white font-bold py-2 px-4 rounded hover:bg-green-800"
        >
          <strong> + Skapa</strong>
          aktivitet
        </button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ActivityForm
            onCreated={fetchActivities}
            activityToEdit={activityToEdit}
            onUpdated={() => {
              fetchActivities();
              setActivityToEdit(null);
            }}
            onClose={() => {
              setShowModal(false);
            }}
          />
        </Modal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActivityList
            activities={filteredActivities}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <div className="md:col-span-2">
            <TaskAssignment onStatusChange={fetchActivities} />
          </div>
          <ActivitetyCalendar activities={activities} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default VolunteerManagementDashboard;
