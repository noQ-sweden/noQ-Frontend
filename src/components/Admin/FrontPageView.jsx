import { useState, useEffect } from "react";
import Main from "../Main/Main";
import Panel from "../Panel";
import Card from "../Card";

const HostelData = ({ loginState }) => {
  const mockData = {
    incomingQuestions: 10,
    leavingPeople: 6,
    livingPeople: 25,
    singleRooms: { used: 5, total: 10 },
    doubleRooms: { used: 4, total: 8 },
    sleepingRooms: { used: 8, total: 20 },
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeRequests, setActiveRequests] = useState(null);
  const [arrivals, setArrivals] = useState(null);
  const [departures, setDepartures] = useState(null);
  const [currentGuests, setCurrentGuests] = useState(null);
  const [availableProducts, setAvailableProducts] = useState(null);

  useEffect(() => {
    setIsLoggedIn(loginState);

    if (loginState === true) {
      // Use the mock data directly for demonstration
      setActiveRequests(mockData.incomingQuestions);
      setDepartures(mockData.leavingPeople);
      setCurrentGuests(mockData.livingPeople);
      setAvailableProducts({
        singleRooms: mockData.singleRooms,
        doubleRooms: mockData.doubleRooms,
        sleepingRooms: mockData.sleepingRooms,
      });
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
                      activeRequests === null
                        ? "Data unavailable"
                        : activeRequests
                    }
                  />
                  <Card
                    title="Leaving"
                    content={
                      departures === null ? "Data unavailable" : departures
                    }
                  />
                  <Card
                    title="Living now"
                    content={
                      currentGuests === null
                        ? "Data unavailable"
                        : currentGuests
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
                        : `${availableProducts.singleRooms.used}/${availableProducts.singleRooms.total}`
                    }
                  />
                  <Card
                    title="Free double rooms"
                    content={
                      availableProducts === null ||
                      availableProducts.doubleRooms === undefined
                        ? "Data unavailable"
                        : `${availableProducts.doubleRooms.used}/${availableProducts.doubleRooms.total}`
                    }
                  />
                  <Card
                    title="Free sleeping multiple rooms"
                    content={
                      availableProducts === null ||
                      availableProducts.sleepingRooms === undefined
                        ? "Data unavailable"
                        : `${availableProducts.sleepingRooms.used}/${availableProducts.sleepingRooms.total}`
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
                    <li className="mb-2">
                      <p>Number of incoming questions: {activeRequests}</p>
                    </li>
                  )}
                </ul>
              </Panel>
              <Panel title="Hostel Status">
                <div className="flex flex-wrap gap-4">
                  <Card
                    title="Total sleep places"
                    content={
                      availableProducts === null
                        ? "Data unavailable"
                        : availableProducts.singleRooms.total +
                          availableProducts.doubleRooms.total +
                          availableProducts.sleepingRooms.total
                    }
                  />
                  <Card
                    title="Booked single room places"
                    content={
                      availableProducts === null
                        ? "Data unavailable"
                        : availableProducts.singleRooms.used
                    }
                  />
                  <Card
                    title="Booked double room places"
                    content={
                      availableProducts === null
                        ? "Data unavailable"
                        : availableProducts.doubleRooms.used
                    }
                  />
                  <Card
                    title="Booked multiple room places"
                    content={
                      availableProducts === null
                        ? "Data unavailable"
                        : availableProducts.sleepingRooms.used
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
