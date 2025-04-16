import React, { useEffect, useState } from 'react';
import axios from "./../api/AxiosNoqApi";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaHandPaper,
  FaArrowRight,
} from "react-icons/fa";

import dayjs from "dayjs";

export default function Activities() {
  const [availableActivities, setAvailableActivities] = useState([]);
  const [myActivities, setMyActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // "2025-04-15"
  });

  const fetchMyActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/volunteer/activities/list", {
      });
      const activities = response.data;
      setMyActivities(activities);
    } catch (err) {
      console.log(err);
      setError("Failed to load volunteer activities");
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
      setError("Failed to load available activities");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedDate) {
      fetchMyActivities();
      fetchAllActivities(selectedDate);
    }
  }, [selectedDate]);

  const signupActivities = async (activity_id) => {
    setLoading(true);
    try {
      const response = await axios.post(`api/volunteer/activities/signup/${activity_id}`);
      const result = response.data;
      console.log(result);
    } catch (err) {
      setError("Failed to sign up for the activity");
    } finally {
      setLoading(false);
    }
    fetchMyActivities();
  };

  const cancelActivities = async (activity_id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`api/volunteer/activities/cancel/${activity_id}`);
      const result = response.data;
      console.log(result);
    } catch (err) {
      setError("Failed to cancel up for the activity");
    } finally {
      setLoading(false);
    }
    fetchMyActivities();
  };

  return (
    <div className="px-14 mb-8 bg-gray-50 min-h-screen">
      {/* Loading and Error Messages */}
      {loading && (
        <div className="text-center text-gray-600 mt-4">Laddar...</div>
      )}
      {error && <div className="text-center text-red-500 mt-4">{error}</div>}


      {/* My Activity list */}
      <h2 className="text-3xl font-bold my-4 text-left">
        Mina Activities
      </h2>
      {myActivities.map((activity) => (
        <div key={activity.id} className="border-t pt-4">
          <h3 className="font-semibold">{activity.title}</h3>
          <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
            <FaCalendarAlt /> {dayjs(activity.start_time).format("MM/DD/YYYY HH:mm")} - {dayjs(activity.end_time).format("MM/DD/YYYY HH:mm")}
            <FaCalendarAlt /> {dayjs(activity.registered_at).format("MM/DD/YYYY HH:mm")}
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm">
            {activity.description}
          </div>
          <button onClick={() => {cancelActivities(activity.id)}} className="mt-2 bg-red-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-2">
            Cancel <FaArrowRight />
          </button>
        </div>
      ))}

      {/* Calendar header (mocked) */}
      <h2 className="text-3xl font-bold my-4 text-left">
        Hitta Activities
      </h2>
      <div className="flex items-center justify-between gap-2 my-10">
        <div className="w-full max-w-xs">
          <label className="block font-medium text-gray-700">
            Välj Startdatum
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-semibold"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 text-xs">
      </div>

      {/* Available Activity list */}
      <h2 className="text-3xl font-bold my-4 text-left">
        Tillgänglig Activities lista
      </h2>
      {availableActivities.map((activity) => (
        <div key={activity.id} className="border-t pt-4">
          <h3 className="font-semibold">{activity.title}</h3>
          <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
            <FaCalendarAlt /> {dayjs(activity.start_time).format("MM/DD/YYYY HH:mm")} - {dayjs(activity.end_time).format("MM/DD/YYYY HH:mm")}
            {activity.is_approved ? (
              <span className="flex items-center text-yellow-600">
                <FaHandPaper className="mr-1" /> Anmält
              </span>
            ) : (
              <span className="flex items-center text-green-600">
                <FaCheckCircle className="mr-1" /> Status
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm">
            {activity.description}
          </div>
          <button onClick={() => {signupActivities(activity.id)}} className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-2">
            Boka <FaArrowRight />
          </button>
        </div>
      ))}
    </div>
  );
}
