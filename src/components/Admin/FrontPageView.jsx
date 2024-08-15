import { React, Fragment, useState, useEffect, useMemo } from "react";
import Main from "../Main/Main";
import Panel from "../Common/Panel";
import Card from "../Common/Card";
import Calendar from "../Common/Calendar";

const HostelData = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeRequests, setActiveRequests] = useState(null);
  const [departures, setDepartures] = useState(null);
  const [currentGuests, setCurrentGuests] = useState(null);
  const [availableProducts, setAvailableProducts] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});

  const mockData = useMemo( () => ({
    incomingQuestions: 10,
    leavingPeople: 6,
    livingPeople: 25,
    singleRooms: { used: 5, total: 10 },
    doubleRooms: { used: 4, total: 8 },
    sleepingRooms: { used: 8, total: 20 },
  }), []);

  const mockRequests = [
    {
      id: 1,
      host: "Jane Smith",
      roomType: "sovsal",
      roomLeft: 5,
      startDate: "2024-06-01",
      endDate: "2024-06-05",
      status: "confirmed",
    },
    {
      id: 2,
      host: "John Johnson",
      roomType: "enkel",
      roomLeft: 5,
      startDate: "2024-06-10",
      endDate: "2024-06-15",
      status: "confirmed",
    },
    {
      id: 3,
      host: "Emma Brown",
      roomType: "sovsal",
      roomLeft: 5,
      startDate: "2024-07-01",
      endDate: "2024-07-10",
      status: "pending",
    },
  ];

  const schedule = {
    Gruppmöte: "10.00",
    Städning: "12.00",
    Utcheckning: "13.00",
    Fika: "15.00",
    Fakturering: "15.30",
    "Kul uppgift med längre text": "17.00",
  };

  useEffect(() => {
    setIsLoggedIn(true);

    if (isLoggedIn) {
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
  }, [isLoggedIn, mockData]);

  const handleCheckboxChange = (task) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [task]: !prev[task],
    }));
  };

  return (
    <Main>
      <div className="flex flex-col py-5">
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
                <div className="bg-white px-2 rounded-md w-full">
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
                            className="mr-2 h-5 w-5 checked accent-green-noQ"
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
                <div className="flex flex-col">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-bold">Namn</div>
                    <div className="font-bold">Inkommen</div>
                    <div className="font-bold">Status</div>
                    {mockRequests.map((request) => (
                      <Fragment key={request.id}>
                        <div>{request.host}</div>
                        <div>{request.startDate}</div>
                        <div>{request.status}</div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </Panel>
              <Panel title="Härbarget status">
                <div>
                  <div></div>
                  <div className="flex flex-col gap-4">
                    <h2>
                      Total sovplatser: [{" "}
                      {availableProducts
                        ? availableProducts.singleRooms.total +
                          availableProducts.doubleRooms.total +
                          availableProducts.sleepingRooms.total
                        : "Data unavailable"}{" "}
                      ]
                    </h2>
                    <h2>
                      Bokad singelrum: [{" "}
                      {availableProducts
                        ? availableProducts.singleRooms.used
                        : "Data unavailable"}{" "}
                      ]
                    </h2>
                    <h2>
                      Booked double room places: [{" "}
                      {availableProducts
                        ? availableProducts.doubleRooms.used
                        : "Data unavailable"}{" "}
                      ]
                    </h2>
                    <h2>
                      Booked dormitory places: [{" "}
                      {availableProducts
                        ? availableProducts.sleepingRooms.used
                        : "Data unavailable"}{" "}
                      ]
                    </h2>
                  </div>
                </div>
              </Panel>
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default HostelData;
