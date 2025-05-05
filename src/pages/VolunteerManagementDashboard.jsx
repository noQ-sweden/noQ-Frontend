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
import useHeader from "../hooks/useHeader";
import useLogin from "../hooks/useLogin";
import { FiPhone, FiMail, FiChevronDown } from 'react-icons/fi';

const VolunteerManagementDashboard = () => {
  const { login } = useLogin();
  const [activities, setActivities] = useState([]);
  const [sortOption, setSortOption] = useState("title-asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [activityToEdit, setActivityToEdit] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        const res = await axiosNoqApi.get("/api/admin/volunteers");
        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        setVolunteers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
        setError("Kunde inte hämta volontärer");
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

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
  const { setHeader } = useHeader();

  useEffect(() => {
    fetchActivities();
    setHeader("Volontärer & aktiviteter");
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
    setShowModal(true);
  };
  const now = new Date();
  const filterByStatus = (activity) => {
    if (filterStatus === "ongoing") return new Date(activity.end_time) >= now;
    if (filterStatus === "completed") return new Date(activity.end_time) < now;
    return true; // "all" case
  };

  const showCalendar = false;

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

  const handleStatusChange = async (activity, newStatus) => {
    try {
      await axiosNoqApi.patch(`/api/admin/activities/${activity.id}`, {
        title: activity.title,
        description: activity.description,
        start_time: activity.start_time,
        end_time: activity.end_time,
        is_approved: activity.is_approved ?? true,
        status: newStatus,
      });
      fetchActivities();
      toast.success("Status uppdaterad!");
    } catch (error) {
      console.error("Error updating status:", error);
      console.log("💥 Error details:", error.response?.data);
      toast.error("Kunde inte uppdatera status.");
    }
  };
  if (loading) return <div className="p-4">Laddar volontärer...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <AdminDashboardLayout>
      {/*Hidden Usage of Login*/}
      {login && <div className="hidden">{login.email}</div>}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <div>

            <div className="bg-white rounded-lg overflow-hidden shadow h-full">
              <div className="px-4 py-5 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-700">{volunteers.length} sökande</h2>
                  <div className="relative">
                    <button
                      className="px-4 py-2 border border-green-800 rounded-full text-green-800 font-medium flex items-center"
                    >
                      <span>Sortera</span>
                      <FiChevronDown className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-200">
                <div className="grid grid-cols-12 px-6 py-4">
                  <div className="col-span-8 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Namn
                  </div>
                  <div className="col-span-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tel
                  </div>
                  <div className="col-span-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    E-post
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {volunteers.length > 0 ? (
                  volunteers.map((volunteer) => (
                    <div key={volunteer.id} className="grid grid-cols-12 px-6 py-4">
                      <div className="col-span-8 text-sm font-medium text-green-800">
                        {volunteer.name}
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <button className="text-gray-500 hover:text-gray-700">
                          <FiPhone className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <button className="text-gray-500 hover:text-gray-700">
                          <FiMail className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-4 text-center text-sm text-gray-500">
                    Inga sökande hittades
                  </div>
                )}
              </div>
            </div>



            </div>
          </div>
          <div className="lg:col-span-2 p-6 bg-white rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">
              Admin:📋 Management Volunteer Activities
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full overflow-hidden">
              <DropdownSort value={sortOption} onChange={setSortOption} />
              <FilterDropdown value={filterStatus} onChange={setFilterStatus} />
              <input
                type="text"
                placeholder="Sök efter aktivitet..."
                className="border border-gray-400 rounded w-full sm:w-64"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
            <VolunteerOverviewList />

            {filteredActivities.length === 0 && (
              <p className="text-gray-500 italic m-4">
                Inga aktiviteter matchade din sökning
              </p>
            )}
            <div className="flex justify-end my-6">
              <button
                onClick={() => {
                  setActivityToEdit(null);
                  setShowModal(true);
                }}
                className="bg-green-700 text-white font-bold py-2 px-4 rounded hover:bg-green-800"
              >
                <strong> + Skapa </strong>
                aktivitet
              </button>
            </div>
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
                onStatusChange={handleStatusChange}
              />
              <div className="md:col-span-2">
                <TaskAssignment onStatusChange={fetchActivities} />
              </div>
              {showCalendar && <ActivitetyCalendar activities={activities} />}
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default VolunteerManagementDashboard;
