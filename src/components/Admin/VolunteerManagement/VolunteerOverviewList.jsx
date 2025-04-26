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
            
            <h1 className="w-[390px] h-[84px] text-3xl flex justify-center items center text-black pt-4 border-b border-gray-300 "> {selectedVolunteer.name}</h1>
             <div>
             <h2 className="pb-6 pt-4 border-b border-gray-300">Volontär detaljer</h2>
             <p className="pb-3 border-b border-gray-300 "><span className="mr-10">Registrerad sedan</span> {selectedVolunteer.datum}</p>
             <p className="pb-3 pt-4 border-b border-gray-300 "><span className="mr-10">Mobilnummer</span> {selectedVolunteer.phone}</p>
             <p className="pb-3 pt-4 border-b border-gray-300 "><span className="mr-10">E-post</span> {selectedVolunteer.email}</p>
             </div>
             <div className="pb-6 pt-4 flex justify-center items center border-b border-gray-300  ">
              <button className="px-6 pb-3 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-100  w-[200px]  ">Avsätta</button>
             </div>
             <div className="pb-6 pt-4 border-b border-gray-300" >
              <h2 className="text-black">Kommande uppdrag</h2>
             </div>

             <ul className="grid grid-cols-1 gap-4 pt-4">
             <li className="flex border-b border-gray-300 pb-2">
              <div className="flex-1 text-gray-500 ">
             <h3>Uppdrag</h3>
             </div>
              <div className="flex-1 text-right text-gray-300 pr-8">
                Datum
                </div>
             </li>
               <li className="flex border-b border-gray-300 pb-2">
              <div className="flex-1">
                      <h3 className="text-green-800">Uppdrag</h3>
               </div>
              <div className="flex-1 text-right">
              Datum
                 </div>
            </li>
            <li className="flex border-b border-gray-300 pb-2">
              <div className="flex-1">
                      <h3 className="text-green-800">Uppdrag</h3>
               </div>
              <div className="flex-1 text-right">
              Datum
                 </div>
            </li>
            <li className="flex border-b border-gray-300 pb-2">
              <div className="flex-1">
                      <h3 className="text-green-800">Uppdrag</h3>
               </div>
              <div className="flex-1 text-right">
              Datum
                 </div>
            </li>
             </ul>


             <div className="px-6 pb-3 pt-6 border-b-4 border-gray-300 flex justify-center items-center">
             <button className="text-center border-b-4 border-green-500 pb-1">
                      Visa mer
             </button>
              </div>

            
          </div>
        </div>
      )}
    </div>
  );
}
