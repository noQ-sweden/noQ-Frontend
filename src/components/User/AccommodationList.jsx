import React, { useEffect, useContext } from "react";
import axios from "../../api/AxiosNoqApi";
import { Link } from "react-router-dom";
import { AccommodationContext } from "../../context/AccommodationProvider";
import shelter from "./../../assets/images/genericShelter.png";
import { formatPostCode } from "../../utility/utilityFunctions";

export default function AccommodationList() {
  const { accommodation, setAccommodation } = useContext(AccommodationContext);

  // Fetch shelter data from the mock API

  useEffect(() => {
    const fetchAvailableShelters = async () => {
      const today = new Date();
      const selected_day = today.toLocaleDateString("sv-SE");
      axios
        .get("/api/user/available/" + selected_day)
        .then(function (response) {
          if (response.status === 200) {
            setAccommodation(response?.data || []);
          }
        })
        .catch((error) => {
          console.log("Error while fetching available shelters.", error);
        });
    }; // Fetch data on component load

    fetchAvailableShelters();
  }, [setAccommodation]);

  return (
    <div className="w-full">
      {accommodation.map((request) => (
        <div
          className="flex flex-col md:grid md:grid-cols-[auto_1fr_auto]
           p-3 my-2 rounded-xl gap-4 md:gap-5 py-6 bg-[#FDFDFD] shadow-md"
          key={request.id}
        >
          <div>
            <div className="flex justify-center md:block">
              <img
                src={shelter}
                alt="Bild av bostället"
                className="rounded-lg w-28 h-28 md:w-20 md:h-20"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between md:justify-start ">
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

          <div className="flex flex-col items-start gap-1">
            <div className="flex flex-col justify-center text-start md:text-left gap-1">
              <p className="font-semibold text-lg">{request.host.name}</p>
              <p className="text-gray-600 text-sm">{request.host.street}</p>
              <p className="text-gray-600 text-sm">
                {formatPostCode(request.host.postcode)} {request.host.city}
              </p>
            </div>

            <div className="text-sm font-semibold  text-gray-700 md:block">
              <p>Kräver biståndsbeslut</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end w-full">
            <Link
              to={`/accommodations/${request.host.id}`}
              className="w-full md:w-auto"
            >
              <button
                className="

                bg-[#2563EB] hover:bg-blue-500 text-white py-2 
                font-semibold text-normal rounded-xl w-full  md:w-auto"
              >
                Välj
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
