import React, { useEffect, useState } from "react";
import { axiosMockNoqApi } from "../../../api/mockApi/mockApi";
import VolunteerOverviewItem from "./VolunteerOverviewItem";

export default function VolunteerOverviewList() {
  const [volunteers, setVolunteers] = useState([]);

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

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Voluntärer</h2>
      {volunteers.map((volunteer) => (
        <VolunteerOverviewItem key={volunteer.email} volunteer={volunteer} />
      ))}
    </div>
  );
}
