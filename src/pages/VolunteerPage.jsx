import React, { useEffect, useState } from 'react';
import axios from './../api/AxiosNoqApi';
import useLogin from '../hooks/useLogin';

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
    const [searchError, setSearchError] = useState(null);
    const [userUno, setUserUno] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newUno, setNewUno] = useState("");
    const [mockApiUsers, setMockApiUsers] = useState([]);


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
        try {
            const bookingData = {
                product_id: selectedProduct.id,
                user_id: foundUserId,
                start_date: selectedDate,
                end_date: endDate, // Using end date
                uno: foundUser.uno
            };

            // Step 1: Create the booking
            const bookingResponse = await axios.post("/api/volunteer/request_booking", bookingData);
            const bookingId = bookingResponse.data.id;

            alert(`Bokningsbekräftelse ${selectedProduct.name}, Gäst: ${foundUser.first_name} ${foundUser.last_name}`);

            // Step 2: Confirm the booking
            await axios.patch(`/api/volunteer/confirm_booking/${bookingId}`);

            alert("Plats bokat, Email med bokingsinformation har skickats ut");
            closePopover();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("Bokning finns redan.");
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
            setSearchError("Ange förnamn, efternamn, eller UNO KOD för att söka");
            return;
          }

        try {
            console.log("Search parameters:", 
                { first_name: userFirstName, 
                    last_name: userLastName, 
                    uno: userUno });
            const response = await axios.get("/api/volunteer/guest/search", {
            params: { first_name: userFirstName,
                 last_name: userLastName,
                  uno: userUno },
            });

            if (response.data.length > 0) {
                const user = response.data[0];
                setFoundUserId(user.id);
                setFoundUser({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    uno: user.uno,
                  });
                setSearchError(null);
            } else {
                setSearchError("Gäst hittades ej.");
            }
        } catch (error) {
            console.error("Error searching for user:", error);
            setSearchError("Error searching for user.");
        }
    };

    return (
        <div className="p-4">
            {/* Welcome message */}
            <div className="text-center mt-4 font-semibold">
                Välkommen, {login?.first_name}
            </div>
    
            {/* Find Available Rooms */}
            <h2 className="text-2xl font-bold my-4">Hitta tillgängliga rum</h2>
    
            {/* Filters Section */}
            <div className="flex space-x-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Välj Startdatum</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
    
                <div>
                    <label className="block text-sm font-medium text-gray-700">Välj Slutdatum</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
    
                <div>
                    <label className="block text-sm font-medium text-gray-700">Välj Bostället </label>
                    <select
                        value={selectedHostId}
                        onChange={(e) => setSelectedHostId(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Alla</option>
                        {hosts.map((host) => (
                            <option key={host.id} value={host.id}>
                                {host.name}
                            </option>
                        ))}
                    </select>
                </div>
    
                <button
                    onClick={handleFilter}
                    className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sök
                </button>
            </div>
    
            {/* Loading and Error Messages */}
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
    
            {/* Create New User Section */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Skapa ny gäst</h3>
                <input
                    type="text"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                    placeholder="Förnamn"
                />
                <input
                    type="text"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                    placeholder="Efternamn"
                />
                <input
                    type="text"
                    value={newUno}
                    onChange={(e) => setNewUno(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                    placeholder="UNO Kod"
                />
                <button
                    onClick={createUser}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Skapa gäst
                </button>
            </div>
    
            {/* Filtered Shelters */}
            <div className="space-y-4">
                {filteredShelters.length > 0 ? (
                    filteredShelters.map((shelter) => (
                        <div key={shelter.host.id} className="border p-4 rounded">
                            <h3 className="text-xl font-semibold">{shelter.host.name}</h3>
                            <p className="text-gray-600">
                                Adress: {shelter.host.street}, {shelter.host.city}
                            </p>
                            <p>Region: {shelter.host.region.name}</p>
                            <div className="mt-2">
                                {shelter.products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="border p-2 rounded mb-2 cursor-pointer"
                                        onClick={() => openBookingPopover(product)}
                                    >
                                        <p className="font-semibold">{product.name}</p>
                                        <p>Beskrivningen: {product.description}</p>
                                        <p>Typ: {product.type}</p>
                                        <p>Antal platser: {product.total_places}</p>
                                        <p>Tillgängliga platser: {product.places_left}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p>Inga lediga rum</p>
                )}
            </div>
    
            {/* Booking Popover */}
            {showPopover && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Boka Rum</h2>
                        <p>{selectedProduct?.name}</p>
    
                        <label className="block text-sm font-medium text-gray-700 mt-4">Söka Gäst</label>
                        <input
                            type="text"
                            value={userFirstName}
                            onChange={(e) => setUserFirstName(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                            placeholder="First name"
                        />
                        <input
                            type="text"
                            value={userLastName}
                            onChange={(e) => setUserLastName(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                            placeholder="Last name"
                        />
                        <input
                            type="text"
                            value={userUno}
                            onChange={(e) => setUserUno(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                            placeholder="UNO code"
                        />
    
                        <button
                            onClick={searchUser}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                            Sök
                        </button>
    
                        {searchError && <p className="text-red-500">{searchError}</p>}
    
                        {foundUser && (
                            <div className="mt-4 p-4 bg-gray-100 rounded">
                                <h3 className="font-semibold mb-2">Booking Details:</h3>
                                <p><strong>Namn:</strong> {foundUser.first_name} {foundUser.last_name}</p>
                                <p><strong>UNO Kod:</strong> {foundUser.uno}</p>
                                <p><strong>Produkt:</strong> {selectedProduct.name}</p>
                                <p><strong>Beskrivningen:</strong> {selectedProduct.description}</p>
                                <p><strong>Startdatum:</strong> {selectedDate}</p>
                                <p><strong>Slutdatum:</strong> {endDate}</p>
                            </div>
                        )}
    
                        <button
                            onClick={handleBooking}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                            disabled={!foundUser}
                        >
                            Bekräfta Bokningen
                        </button>
                        <button
                            onClick={closePopover}
                            className="mt-2 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
    
}
