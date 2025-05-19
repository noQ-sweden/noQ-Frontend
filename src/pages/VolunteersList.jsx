import React, { useState, useEffect } from "react";
import axios from './../api/AxiosNoqApi';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function VolunteersList() {
  const [loading, setLoading] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const volunteersPerPage = 6;

  const indexOfLast = currentPage * volunteersPerPage;
  const indexOfFirst = indexOfLast - volunteersPerPage;
  const currentVolunteers = volunteers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(volunteers.length / volunteersPerPage);

  useEffect(() => {
    const fetchAllVolunteers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("api/host/volunteerlist/", {
          withCredentials: true
        });
        const data = response.data;
        if (Array.isArray(data)) {
               setVolunteers(data);
        } else {
          console.error("Unexpected response:", data);
          setVolunteers([]);
          setError("Unexpected server response");
        }
      } catch (err) {
        setError("Failed to fetch volunteers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllVolunteers();
  }, []);

  useEffect(() => {
    if (!sortOption) return;

    let sorted = [...volunteers];
    if (sortOption === "alphabetical") {
      sorted.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else if (sortOption === "date") {
      sorted.sort((a, b) => new Date(b.date_joined) - new Date(a.date_joined));
    }

    setVolunteers(sorted);
  }, [sortOption, volunteers]);

  if (loading) return <p>Loading volunteers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pt-6 bg-white">
      <div className="pl-8 pr-8">
        <h1 className="py-4 text-3xl font-semibold text-gray-700">Volontärer</h1>
        <div className="py-6"/>
        <div className="h-2 w-full bg-gray-300 rounded mb-6" />
        <div className="py-2"/>
        <div className="flex justify-between items-center">
          <h3 className="py-4 text-2xl font-semibold text-gray-600">
            {volunteers.length} volontärer
          </h3>
          <div className="relative inline-block">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-[#1C4915] text-[#1C4915] px-6 py-2 rounded-3xl appearance-none pr-10 bg-white"
            >
              <option value="">Sortera</option>
              <option value="alphabetical">Alfabetiskt</option>
              <option value="date">Registreringsdatum</option>
            </select>
            <ChevronDownIcon className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#1C4915]" />
          </div>
        </div>
        <div className="py-4"/>
        <div className="h-1 w-full bg-gray-300 rounded" />


        {volunteers.length === 0 ? (
          <p>No volunteers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="text-left py-4 text-lg font-light text-gray-700 border-b border-gray-300">Namn</th>
                  <th className="text-left py-4 text-lg font-light text-gray w-[156px] border-b border-gray-300">Tel</th>
                  <th className="text-left py-4 text-lg font-light text-gray-700 w-[300px] border-b border-gray-300">E-post</th>
                  <th className="text-left py-4 text-lg font-light text-gray-700 w-[200px] border-b border-gray-300">Registerad</th>
                  <th className="text-left py-4 text-lg font-light text-gray-700 w-[120px] border-b border-gray-300">Uppdrag</th>
                </tr>
              </thead>
              <tbody>
                {currentVolunteers.map((volunteer, idx) => (
                  <tr key={idx} className="border-2 border-gray-500">
                    <td className="py-4 border-b border-gray-300 text-green-800">
                      {volunteer.first_name} {volunteer.last_name}
                    </td>
                    <td></td>
                    <td className="py-4 border-b border-gray-300">{volunteer.email}</td>
                    <td className="py-4 border-b border-gray-300">{volunteer.date_joined.split("T")[0]}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="h-2 w-full bg-gray-300 rounded" />
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 py-6">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-6 py-2 rounded-3xl border ${
                  currentPage === i + 1
                    ? 'bg-gray-200 border-gray-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
        <div className="py-6"/>
      </div>
    </div>
  );
}
