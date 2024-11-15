import React, { useEffect, useState } from "react";
import axios from "./../api/AxiosNoqApi";
import ArrowUpIcon from "../assets/images/arrowUpIcon.svg";
import ArrowDownIcon from "../assets/images/arrowDownIcon.svg";
import useLogin from "../hooks/useLogin";
import useHeader from "../hooks/useHeader";
import SEO from "../components/SEO";

export default function CaseworkerPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedHosts, setExpandedHosts] = useState({});

  const { login } = useLogin();
  const { setHeader } = useHeader();
  setHeader("Överblick");

  const getName = (first_name) => {
    if (!first_name) return "Handläggare";
    const capitalFirstName =
      first_name && typeof first_name === "string"
        ? first_name.charAt(0).toUpperCase() + first_name.slice(1)
        : "";

    return `${capitalFirstName}`;
  };

  const formatedName = getName(login.first_name);

  // Variable for text
  const descriptionTitelText = " - Rum";
  const roomAvailableText = " lediga av ";
  const loadingTest = "Laddar...";
  const errorText = "Fel:";
  const namnText = "Rumsnamn";
  const emptyPLacesText = "Lediga platser";
  const descriptionText = "Beskrivning";

  useEffect(() => {
    axios
      .get("/api/caseworker/available_all")
      .then((response) => {
        const fetchedData = response.data;
        setData(fetchedData);

        const firstHostName =
          fetchedData.length > 0 ? fetchedData[0].host.name : null;
        const initialExpandedHosts = fetchedData.reduce((acc, item) => {
          acc[item.host.name] = item.host.name === firstHostName;
          return acc;
        }, {});

        setExpandedHosts(initialExpandedHosts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Misslyckades med att hämta data");
        setLoading(false);
      });
  }, []);

  // Group rooms by host
  const groupByHost = (products) => {
    return products.reduce((acc, product) => {
      const hostName = product.host.name;
      if (!acc[hostName]) {
        acc[hostName] = [];
      }
      acc[hostName].push(product);
      return acc;
    }, {});
  };

  // Calculate available and total rooms for a host
  const calculateRoomAvailability = (rooms) => {
    const totalAvailable = rooms.reduce(
      (acc, room) => acc + room.places_left,
      0
    );
    const totalPlaces = rooms.reduce((acc, room) => acc + room.total_places, 0);
    return `${totalAvailable}${roomAvailableText}${totalPlaces}`;
  };

  // Handle toggling expand/collapse for host
  const toggleExpand = (hostName) => {
    setExpandedHosts((prevState) => ({
      ...prevState,
      [hostName]: !prevState[hostName],
    }));
  };

  // Show loading spinner if the data is still being fetched
  if (loading) {
    return <div>{loadingTest}</div>;
  }

  // Show error message if something went wrong
  if (error) {
    return (
      <div>
        {errorText}
        {error}
      </div>
    );
  }

  // Group data by host
  const groupedData = groupByHost(data);

  return (
    <>
      <div className="flex justify-between items-center">
        <SEO
          title={`Handläggarsida | NoQ - Trygg Plats för att alla förtjänar det
        - ${formatedName}`}
        />
      </div>

      <div className="w-full p-4">
        {Object.keys(groupedData).map((hostName, index) => {
          const rooms = groupedData[hostName];
          const isExpanded = expandedHosts[hostName];

          const roomAvailability = calculateRoomAvailability(rooms);

          return (
            <div
              key={hostName}
              className="bg-white flex flex-col rounded-2xl border-2 border-grey-100 shadow my-4 p-3"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {hostName}
                  {descriptionTitelText}
                </h2>
                <span className="font-bold">{roomAvailability}</span>
              </div>

              {!isExpanded && <div className="border-b mb-1 p-2"></div>}
              {isExpanded && (
                <>
                  <p className="text-gray-500">
                    {rooms[0].host.street}, {rooms[0].host.city}
                  </p>

                  <hr className="mb-4" />

                  {/* Header Row */}
                  <div className="grid grid-cols-[250px,150px,1fr] gap-4 mb-1">
                    <div className="text-left">{namnText}</div>
                    <div className="text-left">{emptyPLacesText}</div>
                    <div className="text-left">{descriptionText}</div>
                  </div>

                  {/* List of products/rooms under each host */}
                  <div>
                    {rooms.map((room) => (
                      <div key={room.id} className="py-2">
                        <div className="grid grid-cols-[250px,150px,1fr] gap-4">
                          {/* Room Name */}
                          <div className="text-left font-semibold">
                            {room.name}
                          </div>

                          {/* Available Rooms */}
                          <div className="text-left font-bold text-xl">
                            {room.places_left} / {room.total_places}
                          </div>

                          {/* Room Description */}
                          <div className="text-left">{room.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Expand/Collapse Button */}
              <div className="">
                <button
                  onClick={() => toggleExpand(hostName)}
                  className="w-full text-gray-800 py-1 text-right"
                  style={{
                    background: "transparent",
                    border: "none",
                    paddingLeft: "0",
                  }}
                >
                  {isExpanded ? (
                    <img
                      src={ArrowUpIcon}
                      alt="Up Arrow"
                      className="w-6 h-6 inline-block"
                    />
                  ) : (
                    <img
                      src={ArrowDownIcon}
                      alt="Down Arrow"
                      className="w-6 h-6 inline-block"
                    />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
