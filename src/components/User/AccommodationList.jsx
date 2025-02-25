import React, { useEffect, useContext, useState } from "react";
import axios from "../../api/AxiosNoqApi";
import { Link } from "react-router-dom";
import { AccommodationContext } from "../../context/AccommodationProvider";
import shelter from "./../../assets/images/genericShelter.png";
import { formatPostCode } from "../../utility/utilityFunctions";
import { format } from "date-fns";

export default function AccommodationList() {
  const { accommodation, setAccommodation } = useContext(AccommodationContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchAvailableShelters = async () => {
      const today = new Date();
      const selected_day = today.toLocaleDateString("sv-SE");
      axios
        .get("/api/user/available/" + selected_day)
        .then((response) => {
          if (response.status === 200) {
            setAccommodation(response?.data || []);
          }
        })
        .catch((error) => {
          console.log("Error while fetching available shelters.", error);
        });
    };

    fetchAvailableShelters();
  }, [setAccommodation]);

  const handleSelectToday = () => {
    setStartDate(new Date());
  };

  const handleSelectTomorrow = () => {
    if (!startDate) {
      alert("Vänligen välj incheckningsdatum först.");
      return;
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setEndDate(tomorrow);
  };

  return (
    <>
      {/* Date Section */}
      <div
        className="flex flex-col border border-gray-300 
          p-3 mt-2 rounded-xl gap-4 lg:gap-5 py-8 bg-[#FDFDFD] shadow-md"
      >
        <p className="mb-2 font-semibold">Välj datum</p>
        <div className="flex flex-col md:flex-row md:max-w-[685px] gap-10">
          <div className="w-full">
            <p className="mb-1">Incheckningsdatum</p>
            <button
              type="button"
              onClick={handleSelectToday}
              className={`p-2 border rounded-md w-full ${
                startDate ? "bg-[#2563EB] text-white" : "bg-[#F7F7F7]"
              }`}
            >
              {startDate ? format(startDate, "yyyy-MM-dd") : "Idag"}
            </button>
          </div>
          <div className="w-full md:mt-7">
            <button
              type="button"
              onClick={handleSelectTomorrow}
              className={`p-2 border rounded-md w-full ${
                endDate ? "bg-[#2563EB] text-white" : "bg-[#F7F7F7]"
              }`}
              disabled={!startDate}
            >
              {endDate ? format(endDate, "yyyy-MM-dd") : "Imorgon"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-col">
        {accommodation.map((request) => (
          <div
            className="flex flex-col border border-gray-300 
          p-3 mt-2 rounded-xl gap-4 lg:gap-5 py-6 bg-[#FDFDFD] shadow-md"
            key={request.id}
          >
            <div className="flex justify-center sm:block">
              <img
                src={shelter}
                alt="Bild av bostället"
                className="rounded-lg w-28 h-28 lg:w-20 lg:h-20"
              />
            </div>
            <div className="flex flex-row items-center md:items-start md:gap-2 justify-between lg:max-w-[97%]">
              <div className="border border-[#2563EB] rounded-full px-3 py-1">
                <p className="text-sm text-[#2563EB] font-light">
                  <Link to={`/accommodations/${request.host.id}`} className="">
                    Mer information
                  </Link>
                </p>
              </div>

              <div>
                <button className="bg-[#EFF6FF] text-[#2563EB] font-light rounded-full px-3">
                  Karta
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center text-start md:text-left gap-1">
              <p className="font-semibold text-lg">{request.host.name}</p>
              <p className="text-gray-600 text-sm">{request.host.street}</p>
              <p className="text-gray-600 text-sm">
                {formatPostCode(request.host.postcode)} {request.host.city}
              </p>
            </div>

            <div className="flex flex-col sm:justify-end sm:items-end w-full">
              <Link
                to={`/accommodations/${request.host.id}`}
                state={{ startDate, endDate }}
                className="w-full md:w-auto"
              >
                <button
                  className="bg-[#2563EB] hover:bg-blue-500 text-white py-2 
                font-semibold text-normal rounded-xl w-full sm:w-36"
                >
                  Välj
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
