import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "./../../api/AxiosNoqApi"; // Use your axios instance

export default function RateVolunteer() {
  const [rating, setRating] = useState(0); // Current rating value
  const [hover, setHover] = useState(0); // Hover effect value for stars
  const [volunteers, setVolunteers] = useState([]); // List of volunteers
  const [selectedVolunteer, setSelectedVolunteer] = useState(null); // Selected volunteer
  const [avgRating, setAvgRating] = useState(null); // Average rating of selected volunteer
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    axios
      .get("/api/volunteers")
      .then((response) => {
        setVolunteers(response.data);
        setSelectedVolunteer(response.data[0] || null);
      })
      .catch((error) => {
        console.error("Error fetching volunteers:", error);
        alert("Could not load volunteers.");
      });
  }, []);

  // Handling the rating submission
  const handleRating = () => {
    if (!selectedVolunteer) return alert("Välj en volontär innan du skickar.");

    // Check if rating is selected
    if (rating === 0) {
      return alert("Vänligen välj ett betyg innan du skickar.");
    }

    setLoading(true);

    // Sending rating to the API
    axios
      .post(`/api/volunteer/${selectedVolunteer.id}/rate`, { rating })
      .then((response) => {
        console.log(response.data);
        setAvgRating(response.data.avgRating); // Update average rating from the response
        alert("Rating har sparats!");
      })
      .catch(() => alert("Fel vid betygsättning."))
      .finally(() => setLoading(false)); // Reset loading state
  };

  // Rendering the star ratings
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        size={28}
        className="cursor-pointer"
        color={(hover || rating) > i ? "#ffc107" : "#e4e5e9"}
        onClick={() => setRating(i + 1)} // Set rating on click
        onMouseEnter={() => setHover(i + 1)} // Highlight stars on hover
        onMouseLeave={() => setHover(0)} // Reset hover state
      />
    ));
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Rate Volunteer</h1>

        {volunteers.length > 0 ? (
          <>
            <label className="text-lg">Välj volontär:</label>
            <select
              value={selectedVolunteer?.id || ""}
              onChange={(e) => {
                const volunteer = volunteers.find(
                  (v) => v.id === parseInt(e.target.value)
                );
                setSelectedVolunteer(volunteer);
                setRating(0); // Reset the rating when changing the volunteer
                setAvgRating(volunteer?.avgRating || null); // Reset avgRating to the volunteer's current rating
              }}
              className="mt-2 p-2 border rounded-md"
            >
              {volunteers.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>

            {selectedVolunteer && (
              <>
                <p className="text-lg mt-4">
                  Volunteer: {selectedVolunteer.name}
                </p>
                <label className="text-lg mt-4">Ge ditt betyg</label>
                <div className="flex gap-1">{renderStars()}</div>
                <p className="text-lg mt-2">Valt betyg: {rating}</p>
                {avgRating !== null && (
                  <p className="text-gray-600">
                    Genomsnittligt betyg: {avgRating}
                  </p>
                )}
                <button
                  onClick={handleRating}
                  disabled={loading}
                  className={`bg-blue-500 text-white rounded-md p-2 mt-4 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Skickar..." : "Skicka"}
                </button>
              </>
            )}
          </>
        ) : (
          <p>Loading volunteers...</p>
        )}
      </div>
    </div>
  );
}
