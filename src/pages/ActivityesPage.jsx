import React, { useEffect, useState, useMemo } from "react";
import axios from "./../api/AxiosNoqApi";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaHandPaper,
  FaArrowRight,
  FaMapMarkerAlt,
  FaFilter,
  FaTimes,
} from "react-icons/fa";

import dayjs from "dayjs";
import ActivityCalendar from "../components/User/ActivityCalendar";

export default function Activities() {
  const [availableActivities, setAvailableActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [myActivities, setMyActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Ex.: "2025-04-15"
  });

  //filter manegemet
  const toggleOption = (option) => {
    setSelectedFilters((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };
  const removeOption = (option) => {
    setSelectedFilters((prev) => prev.filter((o) => o !== option));
  };

  const fetchMyActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/volunteer/activities/list", {});
      const activities = response.data;
      setMyActivities(activities);
    } catch (err) {
      console.log(err);
      setError("Misslyckades med att ladda volontäraktiviteter"); //Failed to load volunteer activities
    } finally {
      setLoading(false);
    }
  };

  const fetchAllActivities = async (date) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/activities/list", {
        params: { date }, // rövidítés: date: date
      });
      const activities = response.data;
      setAvailableActivities(activities);
    } catch (err) {
      setError("Misslyckades med att ladda tillgängliga aktiviteter"); //Failed to load available activities
    } finally {
      setLoading(false);
    }
  };

  const signupActivities = async (activity_id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/volunteer/activities/signup/${activity_id}`
      );
      const result = response.data;
      console.log(result);
    } catch (err) {
      console.log(err);
      setError("Misslyckades med att anmäla sig till aktiviteten"); //Failed to sign up for the activity
    } finally {
      setLoading(false);
    }
    fetchMyActivities();
    console.log(myActivities);
  };

  const cancelActivities = async (activity_id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/volunteer/activities/cancel/${activity_id}`
      );
      const result = response.data;
      console.log(result);
    } catch (err) {
      console.log(err);
      setError("Misslyckades med att avboka aktiviteten"); //Failed to cancel up for the activity
    } finally {
      setLoading(false);
    }
    fetchMyActivities();
  };

  // Helper function to check if an activity is already in the user's activities
  const isActivityRegistered = (activityId) => {
    return myActivities.some((activity) => activity.id === activityId);
  };

  const getFlagsForActivity = (activity) => {
    const matches = activity.description.match(/#[\p{L}0-9_-]+/gu);
    return matches ? matches.map((m) => m.toLowerCase()) : [];
  };

  const uniqueFlags = useMemo(() => {
    const flagSet = new Set(); // ✅ no <string> here

    availableActivities.forEach((activity) => {
      const matches = activity.description.match(/#[\p{L}0-9_-]+/gu);
      if (matches) {
        matches.forEach((match) => flagSet.add(match.toLowerCase()));
      }
    });

    return Array.from(flagSet);
  }, [availableActivities]);

  useEffect(() => {
    if (selectedDate) {
      fetchMyActivities();
      fetchAllActivities(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    let filtered = availableActivities;

    // Filter by search term in the title
    if (search.trim() !== "") {
      filtered = filtered.filter((activity) =>
        activity.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by selected filters (hashtags) in the description
    if (selectedFilters.length > 0) {
      filtered = filtered.filter((activity) =>
        selectedFilters.some((filter) =>
          activity.description.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    // Update the state with the filtered activities
    setFilteredActivities(filtered);
  }, [search, selectedFilters, availableActivities]);

  return (
    <div className="px-14 mb-8 bg-gray-50 min-h-screen">
      {/* Loading and Error Messages */}
      {loading && (
        <div className="text-gray-600 mt-6 absolute inset-x-2/4">Laddar...</div>
      )}
      {error && <div className="text-center text-red-500 mt-4">{error}</div>}

      {/* Calendar header (mocked) */}
      <h2 className="text-3xl font-bold my-4 text-left">Hitta aktiviteter</h2>
      <div className="border rounded-xl p-4 mb-4 shadow-sm bg-white">
        {/* Calendar */}
        <ActivityCalendar
          activities={myActivities}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {/* Filters */}
        <div className="bg-white border p-3 rounded-lg shadow-sm space-y-3">
          {/* Dropdown */}
          <div className="flex items-center gap-2">
            {/* Filter options */}
            {uniqueFlags.map((option) => (
              <button
                key={option}
                onClick={() => toggleOption(option)}
                className={`px-3 py-1 rounded-full text-sm border font-medium
            ${selectedFilters.includes(option)
                    ? "bg-gray-300 text-gray-800 border-gray-400"
                    : "bg-white text-blue-600 border-blue-400"
                  }`}
              >
                {option}
              </button>
            ))}
            {/* Filter counter */}
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-300 rounded-full text-sm font-medium text-gray-700">
              {selectedFilters.length} valda filter
              <FaFilter className="text-xs ml-1" />
            </div>
          </div>

          {/* Selected pills */}
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((option) => (
              <span
                key={option}
                className="bg-gray-300 text-sm px-3 py-1 rounded-full flex items-center gap-1"
              >
                {option}
                <button onClick={() => removeOption(option)}>
                  <FaTimes className="text-xs" />
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-semibold"
            placeholder="Hitta"
          />
        </div>
        {/* Available Activity list */}
        <h2 className="text-3xl font-bold my-4 text-left">
          Tillgängliga Aktiviteter
        </h2>
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="text-sm text-gray-600 flex flex-col gap-1 mt-2"
          >
            {/* Title */}
            <h3 className="font-semibold text-base text-gray-800">
              {activity.title}
            </h3>
            <div className="text-sm text-gray-600 flex flex-col gap-1 mt-2">
              {/* DateTime, location, Boka/Avboka */}
              <div className="flex items-center justify-between w-full gap-2">
                {/* DateTime + location */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-500" />
                    <span>
                      {dayjs(activity.start_time).format("MM/DD/YYYY HH:mm")} -{" "}
                      {dayjs(activity.end_time).format("MM/DD/YYYY HH:mm")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span>
                      {activity.location?.trim() ||
                        (() => {
                          const matches = activity.description?.match(/@[\p{L}0-9_-]+/gu);
                          return matches?.length ? matches[matches.length - 1].slice(1) : "Plats saknas";
                        })()}
                    </span>
                  </div>
                </div>
                {/* Boka/Avboka */}
                <div className="flex items-center justify-end">
                  {!isActivityRegistered(activity.id) ? (
                    <button
                      onClick={() => signupActivities(activity.id)}
                      className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      Boka <FaArrowRight />
                    </button>
                  ) : (
                    <button
                      onClick={() => cancelActivities(activity.id)}
                      className="bg-red-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      Avboka <FaArrowRight />
                    </button>
                  )}
                </div>
              </div>
              {/* Description */}
              <div className="flex items-center gap-1">
                {activity.description}
              </div>
              {/* Status and Flags */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Status */}
                {activity.is_approved ? (
                  <span className="flex items-center text-yellow-600 text-sm font-medium">
                    <FaHandPaper className="mr-1" /> Anmält
                  </span>
                ) : (
                  <span className="flex items-center text-green-600 text-sm font-medium">
                    <FaCheckCircle className="mr-1" /> Status
                  </span>
                )}

                {/* Flags */}
                {getFlagsForActivity(activity).map((flag) => (
                  <button
                    key={flag}
                    onClick={() => toggleOption(flag)}
                    className={`px-3 py-1 rounded-full text-sm border font-medium
        ${selectedFilters.includes(flag)
                        ? "bg-gray-300 text-gray-800 border-gray-400"
                        : "bg-white text-blue-600 border-blue-400"
                      }`}
                  >
                    {flag}
                  </button>
                ))}
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
