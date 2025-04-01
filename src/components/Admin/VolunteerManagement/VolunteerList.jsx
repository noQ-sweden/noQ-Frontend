import React, { useState, useEffect } from "react";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVolunteers()
      .then((data) => {
        setVolunteers(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching volunteers:", error));
  }, []);

  if (loading) return <p>Loading volunteers...</p>;

  return (
    <div>
      <h3>Volunteer List</h3>
      <ul>
        {volunteers.map((volunteer) => (
          <li key={volunteer.id}>
            {volunteer.name} - {volunteer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerList;
