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
      const selected_day = today.toLocaleDateString('sv-SE')
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
    };// Fetch data on component load
    
    fetchAvailableShelters()
  }, [setAccommodation]);

  return (
    <div className="w-full">
      {accommodation.map((request) => (
        <div
          key={request.id}
          className="
                    grid
                    grid-cols-1
                    md:grid-cols-[auto_1fr_auto]
                    rounded
                    p-2
                    my-1
                    bg-white
                    gap-5">
          <div>
            {/*Column 1*/}
            <img
              src={shelter}
              alt="Bild av bostället"
              className="rounded-lg w-20 h-20"
            />
          </div>
          <div className="flex flex-col justify-center">
            {/*Column 2*/}
            <p className="font-semibold">{request.host.name}</p>
            <p className="text-gray-600 text-sm">{request.host.street}</p>
            <p className="text-gray-600 text-sm">{formatPostCode(request.host.postcode)} {request.host.city}</p>
          </div>
          <div className="flex flex-col justify-between items-center p-2">
            {/*Column 3*/}
            <Link to={`/accommodations/${request.host.id}/booking`}>
              <button
                className="
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-3
                  py-1
                  font-semibold
                  text-m
                  align-middle
                  w-full
                  rounded-md
                  focus:outline-none
                  focus:shadow-outline">
                  Välj
              </button>
            </Link>
            <p
              className="
                font-semibold
                text-xs
                sm:text-sm">
              <Link to={`/accommodations/${request.host.id}`} className="flex items-center">
                Mer information
                <FaChevronRight className="ml-2 text-gray-500"/>
              </Link>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
