import React, { useEffect, useContext, useState } from "react";
import axios from "../../api/AxiosNoqApi";
import { Link } from "react-router-dom";
import { AccommodationContext } from "../../context/AccommodationProvider";
import shelter from "./../../assets/images/genericShelter.png";
import { formatPostCode } from "../../utility/utilityFunctions";
//import { FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { FaBed } from "react-icons/fa";

export default function AccommodationList() {
  const { accommodation, setAccommodation } = useContext(AccommodationContext);
  const { t } = useTranslation();
  const [availablePlaces, setAvailablePlaces] = useState({});
  const [womensOnly, setWomensOnly] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch shelter data from the mock API

  useEffect(() => {
    const fetchAvailableShelters = async () => {
      const today = new Date();
      const selected_day = today.toLocaleDateString("sv-SE");
      try {
        const response = await axios.get(`/api/user/available/${selected_day}`);
        if (response.status === 200) {
          setAccommodation(response.data || []);
        }
      } catch (error) {
        console.log("Error while fetching available shelters.", error);
      }
    };

    fetchAvailableShelters();
  }, [setAccommodation]);

  // fetch available places for each host
  useEffect(() => {
    const fetchPlaces = async () => {
      const placesData = {};
      const womensOnlyData = {};

      try {
        const requests = accommodation.map(async (request) => {
          try {
            const { data, status } = await axios.get(
              `/api/user/available_host/${request.host.id}`
            );

            if (status === 200 && data.length > 0) {
              const products = data[0].products;

              placesData[request.host.id] = products.reduce(
                (sum, product) => sum + (product.places_left || 0),
                0
              );

              womensOnlyData[request.host.id] = products.some(
                (product) => product.type === "woman-only"
              );
            } else {
              placesData[request.host.id] = 0;
              womensOnlyData[request.host.id] = false;
            }
          } catch (error) {
            console.error(
              `Error fetching places for host ${request.host.id}:`,
              error
            );
            placesData[request.host.id] = 0;
            womensOnlyData[request.host.id] = false;
          }
        });

        await Promise.all(requests);
        setAvailablePlaces(placesData);
        setWomensOnly(womensOnlyData);
      } catch (error) {
        console.error("Error fetching shelters:", error);
      }
    };

    if (accommodation.length > 0) {
      fetchPlaces();
    }
  }, [accommodation]);

  const handleSelectToday = () => {
    const today = new Date();
    const todayStr = format(today, "yyyy-MM-dd");

    if (startDate && format(startDate, "yyyy-MM-dd") === todayStr) {
      setStartDate(null);
    } else {
      setStartDate(today);
    }
  };

  const handleSelectTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = format(tomorrow, "yyyy-MM-dd");

    if (endDate && format(endDate, "yyyy-MM-dd") === tomorrowStr) {
      setEndDate(null);
    } else {
      setEndDate(tomorrow);
    }
  };

  return (
    <>
      <div className="flex flex-col border border-gray-300 p-3 mt-2 rounded-xl gap-4 lg:gap-5 py-8 bg-[#FFFFFF] shadow-md">
        <p
          className={`px-4 py-1  ${
            startDate && endDate
              ? "hidden"
              : "mb-2 font-semibold md:text-start text-center"
          }`}
        >
          {t("AccommodationBooking.SelectDate")}
        </p>
        <p className="mb-1 md:text-start text-center"></p>

        <div className="flex flex-row justify-center md:justify-start md:items-end gap-6 md:max-w-[685px]">
          <div>
            <span className="flex justify-center text-xs font-medium">
              {t("AccommodationBooking.SelectDateLabel1")}
            </span>
            <button
              id="checkin-date"
              type="button"
              onClick={handleSelectToday}
              className={`px-6 py-1 mt-1 border border-[#1C4915] rounded-full text-sm transition-colors ${
                startDate
                  ? "bg-[#496D44] text-white"
                  : "bg-white text-[#496D44]"
              }`}
            >
              {startDate
                ? format(startDate, "yyyy-MM-dd")
                : t("AccommodationBooking.SelectDateLabel3")}{" "}
            </button>
          </div>
          <div className="">
            <span className="flex justify-center text-xs font-medium">
              {t("AccommodationBooking.SelectDateLabel2")}
            </span>
            <button
              type="button"
              onClick={handleSelectTomorrow}
              className={`px-6 py-1 mt-1 border border-[#1C4915] rounded-full text-sm transition-colors ${
                endDate
                  ? "bg-[#496D44] text-[#fff]"
                  : "bg-[#fff] text-[#496D44]"
              }`}
            >
              {endDate
                ? format(endDate, "yyyy-MM-dd")
                : t("AccommodationBooking.SelectDateLabel4")}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-col">
        {accommodation.map((request) => (
          <div
            className="flex flex-col border border-gray-300 p-3 mt-2 rounded-xl gap-4 lg:gap-5 py-6 bg-[#FFFFFF] shadow-md"
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
              <div className="border border-[#1C4915] hover:bg-[#f9f9f9] rounded-full px-3 py-1">
                <p className="text-sm text-[#496D44] font-light">
                  <Link to={`/accommodations/${request.host.id}`}>
                    {t("ActionButtons.MoreInformation")}
                  </Link>
                </p>
              </div>

              <div>
                <button className="bg-[#D9D9D9] hover:bg-[#d2d2d2] text-[#496D44] font-light rounded-full px-3">
                  {t("ActionButtons.Map")}
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center text-start md:text-left gap-1">
              <p className="font-semibold text-lg text-[#09090B]">
                {request.host.name}
              </p>
              <p className="text-[#5B5959] text-sm">{request.host.street}</p>
              <p className="text-[#5B5959] text-sm">
                {formatPostCode(request.host.postcode)} {request.host.city}
              </p>
            </div>

            {/* availability info */}
            <div className="flex flex-col gap-2 items-end">
              {womensOnly[request.host.id] && (
                <div className="flex items-center  border border-[#1C4915] px-3 py-2 rounded-full">
                  <span className="font-light text-[#496D44]">
                    {" "}
                    Womens Only{" "}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 border border-[#1C4915] px-6 py-2 rounded-full">
                <FaBed className="text-[#496D44]" />
                <span className="font-light text-[#496D44]">
                  {availablePlaces[request.host.id] || 0}{" "}
                  {t("AccommodationDetail.Seats")}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:justify-end sm:items-end w-full">
              {startDate && endDate ? (
                <Link
                  to={`/accommodations/${request.host.id}`}
                  state={{ startDate, endDate }}
                >
                  <button className="bg-[#fff] text-[#496D44] border border-[#1C4915] hover:bg-[#f9f9f9] py-2 font-semibold text-normal rounded-full w-full sm:w-36">
                    {t("ActionButtons.Select")}
                  </button>
                </Link>
              ) : (
                <button
                  className="bg-[#fff] text-[#496D44] border border-[#1C4915] py-2 font-semibold text-normal rounded-full w-full sm:w-36 opacity-50 cursor-not-allowed"
                  disabled
                >
                  {t("ActionButtons.Select")}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
