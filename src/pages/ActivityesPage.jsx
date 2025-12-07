import React, { useEffect, useState, useMemo } from "react";
import axios from "./../api/AxiosNoqApi";
import {
  FaMapMarkerAlt,
  FaFilter,
  FaArrowRight,
  FaCheck,
  FaCalendarAlt,
  FaRegClock,
} from "react-icons/fa";
import { HiOutlineSortAscending, HiOutlineSortDescending } from "react-icons/hi";

import dayjs from "dayjs";
import "dayjs/locale/sv";
import ActivityModal from "../components/User/ActivityModal";
import BookingConfirmationModal from "../components/User/BookingConfirmationModal";
import MiniCalendar from "../components/User/MiniCalendar";
import useHeader from "../hooks/useHeader";

export default function Activities() {
  const { setHeader } = useHeader();
  const [availableActivities, setAvailableActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [myActivities, setMyActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Ex.: "2025-04-15"
  });

  // Filter & Sort State
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ organization: "", type: "" });
  const [sortOrder, setSortOrder] = useState("asc");

  // Modal State
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const fetchMyActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/volunteer/activities/list", {});
      const activities = response.data;
      setMyActivities(activities);
    } catch (err) {
      console.log(err);
      setError("Misslyckades med att ladda volontäraktiviteter");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/activities/list");
      const activities = response.data;
      setAvailableActivities(activities);
    } catch (err) {
      setError("Misslyckades med att ladda tillgängliga aktiviteter");
    } finally {
      setLoading(false);
    }
  };

  const signupActivities = async (activity_id) => {
    setLoading(true);
    try {
      await axios.post(`/api/volunteer/activities/signup/${activity_id}`);
      fetchMyActivities();
      // Close details modal if open
      setIsModalOpen(false);
      // Open confirmation modal
      setIsConfirmationOpen(true);
    } catch (err) {
      console.log(err);
      setError("Misslyckades med att anmäla sig till aktiviteten");
    } finally {
      setLoading(false);
    }
  };

  const cancelActivities = async (activity_id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/volunteer/activities/cancel/${activity_id}`);
      fetchMyActivities();
      // Close modal if open
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      setError("Misslyckades med att avboka aktiviteten");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  const handleModalAction = (activityId) => {
    if (isActivityRegistered(activityId)) {
      cancelActivities(activityId);
    } else {
      signupActivities(activityId);
    }
  };

  const isActivityRegistered = (activityId) => {
    return myActivities.some((activity) => activity.id === activityId);
  };

  useEffect(() => {
    setHeader("Hitta uppdrag");
    fetchMyActivities();
    fetchAllActivities();
  }, []);

  // Compute unique values for filters
  const uniqueOrganizations = useMemo(() => {
    return [
      ...new Set(
        availableActivities.map((a) => a.organization).filter(Boolean)
      ),
    ];
  }, [availableActivities]);

  const uniqueTypes = useMemo(() => {
    return [
      ...new Set(
        availableActivities.map((a) => a.activity_type).filter(Boolean)
      ),
    ];
  }, [availableActivities]);

  useEffect(() => {
    let filtered = [...availableActivities];

    // Filter by selected date (show activities ending on or after selected date)
    if (selectedDate) {
      filtered = filtered.filter((activity) =>
        !dayjs(activity.end_time).isBefore(selectedDate, "day")
      );
    }

    // Filter by Organization
    if (filters.organization) {
      filtered = filtered.filter(
        (activity) => activity.organization === filters.organization
      );
    }

    // Filter by Type
    if (filters.type) {
      filtered = filtered.filter(
        (activity) => activity.activity_type === filters.type
      );
    }

    // Sort by Date/Time (start_time)
    filtered.sort((a, b) => {
      const dateA = dayjs(a.start_time);
      const dateB = dayjs(b.start_time);
      return sortOrder === "asc" ? dateA.diff(dateB) : dateB.diff(dateA);
    });

    setFilteredActivities(filtered);
  }, [availableActivities, selectedDate, filters, sortOrder]);

  return (
    <div className="px-4 md:px-14 mb-8 bg-white min-h-screen font-sans">
      {/* Loading and Error Messages */}
      {loading && (
        <div className="fixed top-4 right-4 bg-blue-100 text-blue-800 px-4 py-2 rounded shadow z-50">
          Laddar...
        </div>
      )}
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 text-red-800 px-4 py-2 rounded shadow z-50">
          {error}
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 items-start mt-24">
        {/* Left Column: Calendar */}
        <div className="w-full md:w-96 md:flex-shrink-0">
          <div className="sticky top-4">
            <MiniCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              activities={myActivities}
            />
          </div>
        </div>

        {/* Right Column: Filters and List */}
        <div className="flex-grow w-full">
          {/* Main Controls Row */}
          <div className="flex justify-start items-center gap-4 mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-2 border rounded-full font-semibold text-sm transition-colors ${showFilters
                ? "bg-green-50 border-green-800 text-green-900"
                : "border-green-800 text-green-900 hover:bg-green-50"
                }`}
            >
              Filtrera <FaFilter className="text-xs" />
            </button>
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="flex items-center gap-2 px-6 py-2 border border-green-800 text-green-900 rounded-full font-semibold text-sm hover:bg-green-50 transition-colors"
            >
              Sortera{" "}
              {sortOrder === "asc" ? (
                <HiOutlineSortAscending className="text-lg" />
              ) : (
                <HiOutlineSortDescending className="text-lg" />
              )}
            </button>
          </div>

          {/* Filter Options Panel */}
          {showFilters && (
            <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-inner">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">
                  Organisation
                </label>
                <select
                  value={filters.organization}
                  onChange={(e) =>
                    setFilters({ ...filters, organization: e.target.value })
                  }
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Alla organisationer</option>
                  {uniqueOrganizations.map((org) => (
                    <option key={org} value={org}>
                      {org}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">
                  Typ
                </label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Alla typer</option>
                  {uniqueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setFilters({ organization: "", type: "" })}
                className="self-end px-3 py-2 text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Rensa filter
              </button>
            </div>
          )}

          {/* Activity List */}
          <div className="space-y-4">
            {filteredActivities.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Inga aktiviteter hittades.</p>
            ) : (
              filteredActivities.map((activity) => {
                const registered = isActivityRegistered(activity.id);

                // Use explicit activity_type from API, fallback to regex or default
                let displayedType = activity.activity_type;
                if (!displayedType) {
                  const tagMatch = activity.description.match(/#([\p{L}0-9_-]+)/u);
                  displayedType = tagMatch ? tagMatch[1] : "Volontär";
                }

                // Clean description by removing tags used for fallback
                const cleanDescription = activity.description
                  .replace(/#[\p{L}0-9_-]+/gu, "")
                  .trim();

                const isDistribution = displayedType.toLowerCase().includes("distribution");
                const tagBgColor = isDistribution
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800";

                return (
                  <div
                    key={activity.id}
                    className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {activity.title}
                        </h3>
                        {activity.organization && (
                          <p className="text-sm font-medium text-gray-500 mt-1">
                            {activity.organization}
                          </p>
                        )}
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${tagBgColor}`}
                      >
                        {displayedType}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4 mt-3">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-500" />
                          <span>
                            {dayjs(activity.start_time).format("DD/MM/YYYY")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaRegClock className="text-gray-500" />
                          <span>
                            {dayjs(activity.start_time).format("HH:mm")} -{" "}
                            {dayjs(activity.end_time).format("HH:mm")}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-500" />
                        <span>{activity.location || "Plats saknas"}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {!registered ? (
                        <button
                          onClick={() => signupActivities(activity.id)}
                          className="bg-green-900 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-green-800 transition-colors"
                        >
                          Boka
                        </button>
                      ) : (
                        <button
                          onClick={() => cancelActivities(activity.id)}
                          className="bg-red-700 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-red-800 transition-colors"
                        >
                          Avboka
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenModal(activity)}
                        className="border border-green-900 text-green-900 px-6 py-2 rounded-full font-medium text-sm flex items-center gap-1 hover:bg-green-50 transition-colors"
                      >
                        Mer information <FaArrowRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Activity Details Modal */}
      <ActivityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        activity={selectedActivity}
        onBook={handleModalAction}
        isRegistered={
          selectedActivity ? isActivityRegistered(selectedActivity.id) : false
        }
      />

      {/* Booking Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      />
    </div>
  );
}
