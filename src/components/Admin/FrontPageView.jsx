import axios from "axios";
import { useState, useEffect } from "react";
import {
  activeRequestsHandler,
  arrivalsHandler,
  departuresHandler,
  currentGuestsHandler,
  availableProductsHandler,
} from "./FrontPageDataFetcher";
import Main from "../Main/Main";
import Panel from "../Panel";
import Card from "../Card";

const HostelData = ({ loginState }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeRequests, setActiveRequests] = useState(null);
  const [arrivals, setArrivals] = useState(null);
  const [departures, setDepartures] = useState(null);
  const [currentGuests, setCurrentGuests] = useState(null);
  const [availableProducts, setAvailableProducts] = useState(null);

  useEffect(() => {
    setIsLoggedIn(loginState);

    if (loginState === true) {
      const dispatcher = async () => {
        const dataHandlers = [
          activeRequestsHandler,
          arrivalsHandler,
          departuresHandler,
          currentGuestsHandler,
          availableProductsHandler,
        ];
        const stateSetters = [
          setActiveRequests,
          setArrivals,
          setDepartures,
          setCurrentGuests,
          setAvailableProducts,
        ];

        try {
          const dataPromises = dataHandlers.map((handler) => handler());
          const results = await Promise.allSettled(dataPromises);

          results.forEach((result, index) => {
            if (result.status === "fulfilled" && result.value.status === 200) {
              stateSetters[index](result.value.data);
            }
          });

          console.log(results);
        } catch (error) {
          console.error(error.message);
        }
      };

      dispatcher();
    }
  }, [loginState]);

  return (
    <Main>
      <div className="flex flex-col">
        <div>
          <h1 className="text-2xl mb-1">Överblick</h1>
        </div>
        <div className="container ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <Panel title="Guests">
                <div className="flex flex-wrap gap-4">
                  <Card
                    title="Incoming"
                    content={
                      arrivals === null
                        ? "Data unavailable"
                        : JSON.stringify(arrivals)
                    }
                  />
                  <Card
                    title="Leaving"
                    content={
                      departures === null
                        ? "Data unavailable"
                        : JSON.stringify(departures)
                    }
                  />
                  <Card
                    title="Living now"
                    content={
                      currentGuests === null
                        ? "Data unavailable"
                        : JSON.stringify(currentGuests)
                    }
                  />
                </div>
              </Panel>
              <Panel title="Empty Rooms">
                <div className="flex flex-wrap gap-4">
                  <Card
                    title="Free single rooms"
                    content={
                      availableProducts === null ||
                      availableProducts.singleRooms === undefined
                        ? "Data unavailable"
                        : availableProducts.singleRooms
                    }
                  />
                  <Card
                    title="Free double rooms"
                    content={
                      availableProducts === null ||
                      availableProducts.doubleRooms === undefined
                        ? "Data unavailable"
                        : availableProducts.doubleRooms
                    }
                  />
                  <Card
                    title="Free sleeping multiple rooms"
                    content={
                      availableProducts === null ||
                      availableProducts.multipleRooms === undefined
                        ? "Data unavailable"
                        : availableProducts.multipleRooms
                    }
                  />
                </div>
              </Panel>
              <Panel title="Schema">
                <div className="bg-gray-100 p-4 rounded-md h-32 w-full">
                  Schema content goes here
                </div>
              </Panel>
            </div>
            <div className="w-full">
              <Panel title="Incoming Requests">
                <ul>
                  {activeRequests === null ? (
                    <li>Data unavailable</li>
                  ) : (
                    activeRequests.map((request, index) => (
                      <li key={index} className="mb-2">
                        <p>Name: {request.name}</p>
                        <p>Date: {request.date}</p>
                        <p>Status: {request.status}</p>
                      </li>
                    ))
                  )}
                </ul>
              </Panel>
              <Panel title="Hostel Status">
                <div className="flex flex-wrap gap-4">
                  <Card
                    title="Total sleep places"
                    content={
                      availableProducts === null ||
                      availableProducts.totalPlaces === undefined
                        ? "Data unavailable"
                        : availableProducts.totalPlaces
                    }
                  />
                  <Card
                    title="Booked single room places"
                    content={
                      availableProducts === null ||
                      availableProducts.bookedSingleRooms === undefined
                        ? "Data unavailable"
                        : availableProducts.bookedSingleRooms
                    }
                  />
                  <Card
                    title="Booked double room places"
                    content={
                      availableProducts === null ||
                      availableProducts.bookedDoubleRooms === undefined
                        ? "Data unavailable"
                        : availableProducts.bookedDoubleRooms
                    }
                  />
                  <Card
                    title="Booked multiple room places"
                    content={
                      availableProducts === null ||
                      availableProducts.bookedMultipleRooms === undefined
                        ? "Data unavailable"
                        : availableProducts.bookedMultipleRooms
                    }
                  />
                </div>
              </Panel>
              <Panel title="Calendar">
                <div className="grid grid-cols-7 gap-2">
                  {[...Array(30).keys()].map((day) => (
                    <div
                      key={day}
                      className="bg-gray-100 p-2 rounded-md text-center">
                      {day + 1}
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default HostelData;
