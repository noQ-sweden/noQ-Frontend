import React, { useEffect, useState } from 'react';
import axios from './../api/AxiosNoqApi'; // Adjust the path as needed
import ArrowUpIcon from '../assets/images/arrowUpIcon.svg';
import ArrowDownIcon from '../assets/images/arrowDownIcon.svg';

export default function CaseworkerPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedHosts, setExpandedHosts] = useState({}); // State to track expanded cards

  // Variable for text
  const descriptionTitelText = " - Rum";
  const roomAvailableText = " lediga av ";
  const countRoomAvailableText = "Antal sängar lediga";
  const totaltText = "totalt";
  
  useEffect(() => {
    axios
      .get('api/caseworker')
      .then((response) => {
        const fetchedData = response.data;
        setData(fetchedData);

        // Automatically expand the first host and collapse others
        const firstHostName = fetchedData.length > 0 ? fetchedData[0].host.name : null;
        const initialExpandedHosts = fetchedData.reduce((acc, item) => {
          acc[item.host.name] = item.host.name === firstHostName;
          return acc;
        }, {});

        setExpandedHosts(initialExpandedHosts);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setError('Misslyckades med att hämta data');
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
    const totalAvailable = rooms.reduce((acc, room) => acc + room.places_left, 0);
    const totalPlaces = rooms.reduce((acc, room) => acc + room.total_places, 0);
    const occupied = totalPlaces - totalAvailable; 
    return `${occupied}${roomAvailableText}${totalPlaces}`;
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
    return <div>Laddar...</div>;
  }

  // Show error message if something went wrong
  if (error) {
    return <div>Fel: {error}</div>;
  }

  // Group data by host
  const groupedData = groupByHost(data);

  return (
    <div className="w-full p-4">

      {/* Loop through grouped data */}
      {Object.keys(groupedData).map((hostName, index) => {
        const rooms = groupedData[hostName];
        const totalRooms = rooms.length; // Count the number of rooms for this host
        const isExpanded = expandedHosts[hostName]; // Check if the current host is expanded
        
        const roomAvailability = calculateRoomAvailability(rooms);

        return (
          <div key={hostName} className="bg-white flex flex-col rounded-2xl border-2 border-grey-100 shadow my-4 p-3">
            {/* Host Information (Always Visible) */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{hostName}{descriptionTitelText}</h2>
              <span className="font-bold">
                {roomAvailability}
              </span>
            </div>

            {/* Conditionally render a separator when the card is closed */}
            {!isExpanded && <div className="border-b mb-1 p-2"></div>}

            {/* Toggle Details */}
            {isExpanded && (
              <>
                <p className="text-gray-500">
                  {rooms[0].host.street}, {rooms[0].host.city}
                </p>

                <hr className="mb-4" />

                {/* Header Row */}
                <div className="grid grid-cols-[250px,150px,1fr] gap-4 mb-1">
                  <div className="text-left">Namn</div>
                  <div className="text-left">Lediga platser</div>
                  <div className="text-left">Beskrivning</div>
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
                        <div className="text-left">
                          {room.description}
                        </div>
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
                style={{ background: 'transparent', border: 'none', paddingLeft: '0' }}
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
  );
}
