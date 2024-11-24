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
                end_date: endDate // Using end date
            };

            // Step 1: Create the booking
            const bookingResponse = await axios.post("/api/volunteer/request_booking", bookingData);
            const bookingId = bookingResponse.data.id;

            alert(`Booking successful! Room: ${selectedProduct.name}, Guest: ${foundUser.first_name} ${foundUser.last_name}`);

            // Step 2: Confirm the booking
            await axios.patch(`/api/volunteer/confirm_booking/${bookingId}`);

            alert("Booking confirmed and email sent to guest!");
            closePopover();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("A booking with these details already exists.");
            } else if (error.response && error.response.status === 422) {
                alert("End date must be after start date.");
            } else if (error.response) {
                console.error("Error confirming booking:", error.response.data);
                alert(`Booking failed. Error: ${error.response.data.error || "Unknown error"}`);
            } else {
                console.error("Unexpected error:", error);
                alert("Booking failed due to an unexpected error.");
            }
        }
    };

    const searchUser = async () => {
        if (!userFirstName.trim() && !userLastName.trim()) {
            setSearchError("Please enter a first name or last name to search.");
            return;
        }

        try {
            const response = await axios.get("/api/volunteer/guest/search", {
                params: { first_name: userFirstName, last_name: userLastName },
            });

            if (response.data.length > 0) {
                const user = response.data[0];
                setFoundUserId(user.id);
                setFoundUser({ first_name: userFirstName, last_name: userLastName });
                setSearchError(null);
            } else {
                setSearchError("User not found.");
            }
        } catch (error) {
            setSearchError("Error searching for user.");
        }
    };

    return (
        <div className="p-4">
            <div className="text-center mt-4 font-semibold">
                Welcome, {login?.first_name}
            </div>

            <h2 className="text-2xl font-bold my-4">Find Available Rooms</h2>

            {/* Filter section */}
            <div className="flex space-x-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Start Date</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Select End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Host</label>
                    <select
                        value={selectedHostId}
                        onChange={(e) => setSelectedHostId(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">All Hosts</option>
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
                    Search
                </button>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}

            <div className="space-y-4">
                {filteredShelters.length > 0 ? (
                    filteredShelters.map((shelter) => (
                        <div key={shelter.host.id} className="border p-4 rounded">
                            <h3 className="text-xl font-semibold">{shelter.host.name}</h3>
                            <p className="text-gray-600">
                                Location: {shelter.host.street}, {shelter.host.city}
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
                                        <p>Description: {product.description}</p>
                                        <p>Type: {product.type}</p>
                                        <p>Total Places: {product.total_places}</p>
                                        <p>Available Places: {product.places_left}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p>No available rooms found</p>
                )}
            </div>

            {showPopover && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Book Room</h2>
                        <p>{selectedProduct?.name}</p>

                        <label className="block text-sm font-medium text-gray-700 mt-4">Search Guest by Name</label>
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
                        <button
                            onClick={searchUser}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                            Search User
                        </button>

                        {searchError && <p className="text-red-500">{searchError}</p>}

                        {foundUser && (
                            <div className="mt-4 p-4 bg-gray-100 rounded">
                                <h3 className="font-semibold mb-2">Booking Details:</h3>
                                <p><strong>Guest Name:</strong> {foundUser.first_name} {foundUser.last_name}</p>
                                <p><strong>Product:</strong> {selectedProduct.name}</p>
                                <p><strong>Description:</strong> {selectedProduct.description}</p>
                                <p><strong>Start Date:</strong> {selectedDate}</p>
                                <p><strong>End Date:</strong> {endDate}</p>
                            </div>
                        )}

                        <button
                            onClick={handleBooking}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                            disabled={!foundUser}
                        >
                            Confirm Booking
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
