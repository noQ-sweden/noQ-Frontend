import React, { useEffect, useState } from "react";
import { axiosMockNoqApi } from "../../../api/mockApi/mockApi";
import VolunteerOverviewItem from "./VolunteerOverviewItem";

export default function VolunteerOverviewList() {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosMockNoqApi.get("/api/admin/volunteers");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setVolunteers(res.data);
        } else {
          console.warn("No volunteers found");
          setVolunteers([]);
        }
      } catch (error) {
        console.error("Error fetching volunteers:", error);
        setVolunteers([]);
      }
    };
    fetchData();
  }, []);

  const handleVolunteerClick = (volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  const closeModal = () => {
    setSelectedVolunteer(null);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Voluntärer</h2>

      {volunteers.map((volunteer) => (
        <div
          key={volunteer.email}
          onClick={() => handleVolunteerClick(volunteer)}
          className="cursor-pointer"
        >
          <VolunteerOverviewItem volunteer={volunteer} />
        </div>
      ))}

      {/* Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-2">Volontär Detaljer</h3>
            <p><strong>Namn:</strong> {selectedVolunteer.name}</p>
            <p><strong>Registrerad sedan:</strong> {selectedVolunteer.datum}</p>
            <p><strong>Mobilnummer:</strong> {selectedVolunteer.phone}</p>
            <p><strong>E-post:</strong> {selectedVolunteer.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}
