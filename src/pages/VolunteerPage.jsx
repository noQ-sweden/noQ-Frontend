
import React, { useEffect, useState } from "react";
import axios from "./../api/AxiosNoqApi";
import useLogin from "../hooks/useLogin";

export default function VolunteerPage() {
  const { login } = useLogin();
  const [availableShelters, setAvailableShelters] = useState([]);
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [endDate, setEndDate] = useState(""); // New state for end date
  const [selectedHostId, setSelectedHostId] = useState("");
  const [hosts, setHosts] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [foundUserId, setFoundUserId] = useState(null);
  const [foundUser, setFoundUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [userUno, setUserUno] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUno, setNewUno] = useState("");
  const [_mockApiUsers, setMockApiUsers] = useState([]);


  useEffect(() => {
    const fetchAllShelters = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/volunteer/available');
        const shelters = response.data;
        setAvailableShelters(shelters);

        const uniqueHosts = [];
        const hostIds = new Set();
        shelters.forEach(shelter => {
          if (!hostIds.has(shelter.host.id)) {
            uniqueHosts.push(shelter.host);
            hostIds.add(shelter.host.id);
          }
        });
        setHosts(uniqueHosts);
      } catch (err) {
        setError('Failed to load available shelters');
      } finally {
        setLoading(false);
      }
    };
    fetchAllShelters();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/volunteer/guest/list");
      console.log("Fetched users:", response.data);
      setMockApiUsers(response.data);

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilter = () => {
    let filtered = [...availableShelters];
    if (selectedHostId) {
      filtered = filtered.filter(shelter => shelter.host.id === parseInt(selectedHostId));
    }
    if (selectedDate) {
      filtered = filtered.map(shelter => ({
        ...shelter,
        products: shelter.products.filter(product => {
          const availability = product.availability?.find(avail => avail.date === selectedDate);
          product.places_left = availability ? availability.places_left : product.total_places;
          return product.places_left > 0;
        })
      })).filter(shelter => shelter.products.length > 0);
    }
    setFilteredShelters(filtered);
  };

  const createUser = async () => {
    console.log("createUser called");

    if (!newFirstName || !newLastName || !newUno) {
      alert("Fyll i alla fält");
      return;
    }

    try {
      const response = await axios.post("/api/volunteer/guest/create", {
        first_name: newFirstName,
        last_name: newLastName,
        uno: newUno,
        gender: "N",
        region: "Stockholm"
      });
      alert("Gäst har skapats!");
      setMockApiUsers((prev) => [...prev, response.data]);
      setNewFirstName("");
      setNewLastName("");
      setNewUno("");

      await fetchUsers();

    } catch (error) {
      if (error.response?.status === 409) {
        alert("Någon med denna UNO KOD finns redan");
      } else {
        console.error("Error creating user:", error);
        alert("Fel vid skapning av gästkonto.");
      }
    }
  };



  const openBookingPopover = (product) => {
    console.log("Selected Product:", product);
    setSelectedProduct(product);
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
    setSelectedProduct(null);
    setUserFirstName("");
    setUserLastName("");
    setFoundUser(null);
    setFoundUserId(null);
    setSearchError(null);
  };

  const handleBooking = async () => {
    if (!selectedUserId) {
      alert("Välj en gäst innan du bokar.");
      return;
    }

    try {
      const selectedUser = foundUser?.find(user => user.id === selectedUserId);

      if (!selectedUser) {
        alert("Ingen användare vald.");
        return;
      }
      const bookingData = {
        product_id: selectedProduct.id,
        user_id: foundUserId,
        start_date: selectedDate,
        end_date: endDate, // Using end date
        uno: selectedUser.uno,

      };

      // Step 1: Create the booking
      const bookingResponse = await axios.post("/api/volunteer/booking/request", bookingData);
      const bookingId = bookingResponse.data.id;

      alert(`Bokningsbekräftelse ${selectedProduct?.name || "Okänt namn"}, Gäst: ${selectedUser?.first_name || "Okänd"} ${selectedUser?.last_name || "Okänd"}`);

      // Step 2: Confirm the booking
      await axios.patch(`/api/volunteer/confirm_booking/${bookingId}`);

      alert("Plats bokat, Email med bokingsinformation har skickats ut");
      closePopover();

    } catch (error) {
      if (error.response && error.response.status === 409) {
        if (error.response.data.detail == "Booking is pending and can't be confirmed.") {
          alert("Bokning väntar på godkännande och kan inte bekräftas.");
          closePopover();
        } else {
          alert("Bokning finns redan.");
          closePopover();
        }
      } else if (error.response && error.response.status === 422) {
        alert("Fel med Datum");
      } else if (error.response) {
        console.error("Error confirming booking:", error.response.data);
        alert(`Bokning gick ej igenom ${error.response.data.error || "Unknown error"}`);
      } else {
        console.error("Unexpected error:", error);
        alert("Fel vid Bokning.");
      }
    }
  };

  const searchUser = async () => {
    if (!userFirstName.trim() && !userLastName.trim() && !userUno.trim()) {
      setSearchError("Ange förnamn, efternamn, eller UNO KOD för att söka.");
      return;
    }

    try {
      console.log("Search parameters:", {
        first_name: userFirstName,
        last_name: userLastName,
        uno: userUno,
      });

      const response = await axios.get("/api/volunteer/guest/search", {
        params: {
          first_name: userFirstName,
          last_name: userLastName,
          uno: userUno
        },
      });

      if (response.data.length > 0) {
        setSearchError(null);
        setFoundUser(response.data);
      } else {
        setSearchError("Gäst hittades ej.");
        setFoundUser([]);
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      setSearchError("Error searching for user.");
      setFoundUser([]);
    }
  };



  return (
    <div className="px-14 mb-8 bg-gray-50 min-h-screen">
      {/* Welcome Message */}
      <div className="text-center text-xl mt-4 font-semibold text-gray-800">
        Välkommen, {login?.first_name}
      </div>

      {/* Find Available Rooms */}
      <h2 className="text-3xl font-bold my-4 text-left">
        Hitta Tillgängliga Rum
      </h2>

      {/* Filters Section */}
      <div className="flex items-center justify-between gap-2 my-10">
        <div className="w-full max-w-xs">
          <label className="block font-medium text-gray-700">Välj Startdatum</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-semibold"
          />
        </div>

        <div className="w-full max-w-xs">
          <label className="block font-medium text-gray-700">Välj Slutdatum</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-semibold"
          />
        </div>

        <div className="w-full max-w-xs">
          <label className="block font-medium text-gray-700">Välj Värd</label>
          <select
            value={selectedHostId}
            onChange={(e) => setSelectedHostId(e.target.value)}
            className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-semibold"
          >
            <option value="">Alla Värdar</option>
            {hosts.map((host) => (
              <option key={host.id} value={host.id}>
                {host.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-auto">
          <button
            onClick={handleFilter}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-5 py-2 rounded mt-6"
          >
            Sök
          </button>
        </div>
      </div>

      {/* Loading and Error Messages */}
      {loading && <div className="text-center text-gray-600 mt-4">Laddar...</div>}
      {error && <div className="text-center text-red-500 mt-4">{error}</div>}

      {/* Create New Guest Section */}
      <div className="my-10 max-w-screen-sm">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-left">
          Skapa en Ny Gäst
        </h3>
        <div className="grid gap-4 w-1/2">
          <input
            type="text"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-semibold"
            placeholder="Förnamn"
          />
          <input
            type="text"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-semibold"
            placeholder="Efternamn"
          />
          <input
            type="text"
            value={newUno}
            onChange={(e) => setNewUno(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-semibold"
            placeholder="UNO Kod"
          />
        </div>
        <button
          onClick={createUser}
          className="mt-6 w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded"
        >
          Skapa Användare
        </button>
      </div>

      {/* Filtered Shelters */}
      <div className="space-y-6 mt-8 w-full">
        {filteredShelters.length > 0 ? (
          filteredShelters.map((shelter) => (
            <div
              key={shelter.host.id}
              className="border border-gray-200 shadow-md rounded-lg p-6 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-800">
                {shelter.host.name}
              </h3>
              <p className="text-gray-600 mt-2">
                <span className="font-medium text-gray-700">Plats:</span>{" "}
                {shelter.host.street}, {shelter.host.city}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">Region:</span>{" "}
                {shelter.host.region.name}
              </p>
              <div className="mt-4 space-y-3">
                {shelter.products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-300 bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    onClick={() => openBookingPopover(product)}
                  >
                    <p className="font-bold pb-4 text-lg text-gray-800">
                      {product.name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-700">Beskrivning:</span>{" "}
                      {product.description}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-700">Typ:</span>{" "}
                      {product.type}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-700">Totalt Antal Platser:</span>{" "}
                      {product.total_places}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-700">Tillgängliga Platser:</span>{" "}
                      {product.places_left}
                    </p>

                    <div>
                      {product.features && product.features.length > 0 && (
                        <ul>
                          {product.features.map((feature, index) => (
                            <li key={index} className="pb-1">
                              <span className="font-medium">{feature.label}:</span>{" "}
                              {feature.value}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                ))}
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center text-gray-500 text-lg mt-4">
              Inga tillgängliga rum hittades
            </p>
          )
        )}
      </div>

      {/* Booking Popover */}
      {showPopover && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Boka Rum</h2>
            <div className="space-y-2">
              <input
                type="text"
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Förnamn"
              />
              <input
                type="text"
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Efternamn"
              />
              <input
                type="text"
                value={userUno}
                onChange={(e) => setUserUno(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="UNO Kod"
              />
            </div>
            <button
              onClick={searchUser}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded w-full mt-4"
            >
              Sök Användare
            </button>
            {searchError && <p className="text-red-500 text-sm mt-2">{searchError}</p>}
            {foundUser && foundUser.length > 0 && (
              <div>
                <h3>Välj en gäst:</h3>
                <ul>
                  {foundUser.map((user) => (
                    <li
                      key={user.id}
                      style={{
                        padding: "8px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        backgroundColor: selectedUserId === user.id ? "#cce5ff" : "white",

                      }}
                      onClick={() => {
                        setSelectedUser(user);
                        setSelectedUserId(user.id); // Fix
                      }}

                    >
                      {user.first_name} {user.last_name} ({user.uno})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <button
                onClick={handleBooking}
                disabled={!selectedUserId}
                style={{
                  backgroundColor: selectedUserId ? "#007bff" : "#ccc",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  cursor: selectedUserId ? "pointer" : "not-allowed"
                }}
              >
                Bekräfta
              </button>

              <button
                onClick={closePopover}
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex-1"
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );

}
