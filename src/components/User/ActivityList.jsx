import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export default function ActivityList() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities(selectedDate);
  }, [selectedDate]);

  const fetchActivities = async (date) => {
    try {
      const response = await axios.get(`/api/activities/list?date=${date}`);
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Elérhető aktivitások</h2>

      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="border px-2 py-1 rounded mb-4"
      />

      {activities.length === 0 ? (
        <p>Nincs elérhető aktivitás erre a napra.</p>
      ) : (
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="border rounded-lg p-4 shadow-sm bg-white flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-sm text-gray-500">
                  {dayjs(activity.start_time).format('HH:mm')} – {dayjs(activity.end_time).format('HH:mm')}
                </p>
              </div>

              <div>
                {activity.is_registered ? (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">Feliratkozva</span>
                ) : (
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Feliratkozás
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
