import React, { useEffect, useContext } from "react";
import axios from "../../api/AxiosNoqApi";
import { Link } from "react-router-dom";
import { AccommodationContext } from "../../context/AccommodationProvider";
import shelter from "./../../assets/images/genericShelter.png";
import { formatPostCode } from "../../utility/utilityFunctions";
import { FaChevronRight } from "react-icons/fa";

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
        rounded p-3 my-2  gap-4 md:gap-5 bg-white shadow-sm"
          key={request.id}
        >
          <div>
            <div className="flex justify-center md:block">
              <img
                src={shelter}
                alt="Bild av bostället"
                className="rounded-lg w-16 h-16 md:w-20 md:h-20"
              />
            </div>

            <div className="flex flex-col justify-center text-center md:text-left">
              <p className="font-semibold text-lg">{request.host.name}</p>
              <p className="text-gray-600 text-sm">{request.host.street}</p>
              <p className="text-gray-600 text-sm">
                {formatPostCode(request.host.postcode)} {request.host.city}
              </p>
            </div>

            <div className="text-sm font-semibold flex justify-center items-center text-gray-700 md:block">
              <p>Kräver biståndsbeslut</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 w-full">
            <Link
              to={`/accommodations/${request.host.id}`}
              className="w-full md:w-auto"
            >
              <button
                className="
                bg-[#4CAA4A] hover:bg-green-600 text-white px-4 py-2 
                font-semibold text-sm rounded-md w-full md:w-auto"
              >
                Välj
              </button>
            </Link>
            <p className="text-sm font-semibold">
              <Link
                to={`/accommodations/${request.host.id}`}
                className="flex items-center justify-center md:justify-start text-[#4CAA4A]"
              >
                Mer information{" "}
                <FaChevronRight className="ml-2 text-gray-500" />
              </Link>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
