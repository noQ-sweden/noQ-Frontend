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

  const schedule = {
    Gruppmöte: "10.00",
    Städning: "12.00",
    Utcheckning: "13.00",
    Fika: "15.00",
    Fakturering: "15.30",
    "Kul uppgift med längre text": "17.00",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeRequests, setActiveRequests] = useState(null);
  const [arrivals, setArrivals] = useState(null);
  const [departures, setDepartures] = useState(null);
  const [currentGuests, setCurrentGuests] = useState(null);
  const [availableProducts, setAvailableProducts] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});

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

  const handleCheckboxChange = (task) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [task]: !prev[task],
    }));
  };

  return (
    <Main>
      <div className="flex flex-col">
        <div>
          <h1 className="text-2xl mb-1">Överblick</h1>
        </div>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <Panel title="Guests">
                <div className="flex grow flex-wrap gap-4">
                  <Card
                    title="Ankomster"
                    unit="Personer"
                    textColor="#E45F5F"
                    content={
                      activeRequests === null
                        ? "Data unavailable"
                        : activeRequests
                    }
                  />
                  <Card
                    title="Avgångar"
                    unit="Personer"
                    textColor="#1EA5DF"
                    content={
                      departures === null ? "Data unavailable" : departures
                    }
                  />
                  <Card
                    title="Bör nu"
                    unit="Personer"
                    textColor="#4CAA4A"
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
                    title="Lediga singelrum"
                    unit="Rum"
                    content={
                      availableProducts === null ||
                      availableProducts.singleRooms === undefined
                        ? "Data unavailable"
                        : `${availableProducts.singleRooms.used}/${availableProducts.singleRooms.total}`
                    }
                  />
                  <Card
                    title="Lediga dubbelrum"
                    unit="Rum"
                    content={
                      availableProducts === null ||
                      availableProducts.doubleRooms === undefined
                        ? "Data unavailable"
                        : `${availableProducts.doubleRooms.used}/${availableProducts.doubleRooms.total}`
                    }
                  />
                  <Card
                    title="Lediga sovsal"
                    unit="Sovsal"
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
                <div className="bg-white p-4 rounded-md w-full">
                  <ul>
                    {Object.entries(schedule).map(([event, time]) => (
                      <li
                        key={event}
                        className="mb-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={!!completedTasks[event]}
                            onChange={() => handleCheckboxChange(event)}
                            className="mr-2 h-5 w-5 checked accent-green-noQ "
                            style={{
                              color: "#255B57",
                              borderColor: "#255B57",
                              backgroundColor: completedTasks[event]
                                ? "#255B57"
                                : "transparent",
                            }}
                          />
                          <span
                            className={`${
                              completedTasks[event] ? "line-through" : ""
                            }`}>
                            <strong>{event}</strong>
                          </span>
                        </div>
                        <span>{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Panel>
            </div>
            <div className="w-full">
              <Panel title="Förfrågningar">
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
              <Panel title="Härbarget status">
                <div>
                  <div></div>
                  <div className="flex flex-col gap-4">
                    <h2>
                      Total sovplatser: [
                      {availableProducts
                        ? availableProducts.singleRooms.total +
                          availableProducts.doubleRooms.total +
                          availableProducts.sleepingRooms.total
                        : "Data unavailable"}
                      ]
                    </h2>
                    <h2>
                      Bokad singelrum: [
                      {availableProducts
                        ? availableProducts.singleRooms.used
                        : "Data unavailable"}
                      ]
                    </h2>
                    <h2>
                      Booked double room places: [
                      {availableProducts
                        ? availableProducts.doubleRooms.used
                        : "Data unavailable"}
                      ]
                    </h2>
                    <h2>
                      Booked multiple room places: [
                      {availableProducts
                        ? availableProducts.sleepingRooms.used
                        : "Data unavailable"}
                      ]
                    </h2>
                  </div>
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
