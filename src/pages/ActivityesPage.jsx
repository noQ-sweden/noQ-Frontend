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
import { HiOutlineSortAscending } from "react-icons/hi";

import dayjs from "dayjs";
import "dayjs/locale/sv";
import MiniCalendar from "../components/User/MiniCalendar";

dayjs.locale("sv");

export default function Activities() {
  const [availableActivities, setAvailableActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [myActivities, setMyActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Ex.: "2025-04-15"
  });

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
    } catch (err) {
      console.log(err);
      setError("Misslyckades med att avboka aktiviteten");
    } finally {
      setLoading(false);
    }
  };

  const isActivityRegistered = (activityId) => {
    return myActivities.some((activity) => activity.id === activityId);
  };

  useEffect(() => {
    fetchMyActivities();
    fetchAllActivities();
  }, []);

  useEffect(() => {
    let filtered = availableActivities;

    // Filter by selected date (show activities ending on or after selected date)
    if (selectedDate) {
      filtered = filtered.filter((activity) =>
        !dayjs(activity.end_time).isBefore(selectedDate, "day")
      );
    }

    setFilteredActivities(filtered);
  }, [availableActivities, selectedDate]);

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

      {/* Header */}
      <h2 className="text-2xl font-bold my-6 text-left text-gray-900">
        Hitta uppdrag
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-start">
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
          {/* Filter and Sort Buttons */}
          <div className="flex justify-start items-center gap-4 mb-6">
            <button className="flex items-center gap-2 px-6 py-2 border border-green-800 text-green-900 rounded-full font-semibold text-sm hover:bg-green-50">
              Filtrera <FaFilter className="text-xs" />
            </button>
            <button className="flex items-center gap-2 px-6 py-2 border border-green-800 text-green-900 rounded-full font-semibold text-sm hover:bg-green-50">
              Sortera <HiOutlineSortAscending className="text-lg" />
            </button>
          </div>

          {/* Activity List */}
          <div className="space-y-4">
            {filteredActivities.map((activity) => {
              const registered = isActivityRegistered(activity.id);
              // Helper to extract tag from description or use default
              const tagMatch = activity.description.match(/#([\p{L}0-9_-]+)/u);
              const tag = tagMatch ? tagMatch[1] : "Volontär";
              // Clean description by removing tags
              const cleanDescription = activity.description
                .replace(/#[\p{L}0-9_-]+/gu, "")
                .trim();

              // Determine tag color (mock logic based on image examples)
              const isDistribution = tag.toLowerCase().includes("distribution");
              const tagBgColor = isDistribution
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800";

              return (
                <div
                  key={activity.id}
                  className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900">
                      {activity.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${tagBgColor}`}
                    >
                      {tag}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
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
                    <button className="border border-green-900 text-green-900 px-6 py-2 rounded-full font-medium text-sm flex items-center gap-1 hover:bg-green-50 transition-colors">
                      Mer information <FaArrowRight className="text-xs" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
