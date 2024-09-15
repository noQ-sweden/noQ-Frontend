import React, { useState, useEffect, useCallback } from 'react';
import axios from './../../api/AxiosNoqApi';
import RequestListCompact from './RequestListCompact'
import BookingRow from './BookingRow'
//import UndoRow from './UndoRow'
import PropTypes from "prop-types";
import Panel from "./../Common/Panel";

export default function RequestList({compact=false, config}) {
    RequestList.propTypes = {
        compact: PropTypes.bool,
        config: PropTypes.shape({
            fetchUrl: PropTypes.string.isRequired,
            assignUrl: PropTypes.func.isRequired, // function that returns a URL based on bookingId
            batchAssignUrl: PropTypes.string.isRequired, // function that returns a URL batch assignment
            rejectUrl: PropTypes.func.isRequired, // function that returns a URL based on bookingId
            undoUrl: PropTypes.func.isRequired // function that returns a URL based on bookingId
        }).isRequired
    };

    const [requests, setRequests] = useState([]);
    const [undoRequests, setUndoRequests] = useState([]);
    const [uniqueHosts, setUniqueHosts] = useState([]);
    const [checkedBookings, setCheckedBookings] = useState([{}]);

    const removeBookingIdFromAllHosts = (bookingIdToRemove) => {
        setCheckedBookings((prev) => {
            // Create a new object to avoid direct mutation of state
            const updatedBookings = { ...prev };
        
            // Iterate over each host in the dictionary
            for (const hostId in updatedBookings) {
                if (Object.prototype.hasOwnProperty.call(updatedBookings, hostId)) {
                    const bookingsArray = 
                        Array.isArray(updatedBookings[hostId]) ? updatedBookings[hostId] : [];
                    // Filter out the bookingId from the array
                    updatedBookings[hostId] = bookingsArray.filter(
                        (id) => id !== bookingIdToRemove
                    );
                }
            }
        
            return updatedBookings;
        });
    };

    const handleAction = async (url, updateUndoList = false, payload = []) => {
        try {
            let response = undefined;
            if (payload.length !== 0) {
                response = await axios.patch(url, payload);
            } else {
                response = await axios.patch(url);
            }
            if (response.status === 200 && response?.data !== "") {
                if (updateUndoList) {
                    setUndoRequests([...undoRequests, response.data]);
                }
                for (const booking of payload) {
                    removeBookingIdFromAllHosts(booking.booking_id);
                }
                fetchPendingRequests();
            }
        } catch (error) {
            console.error("Error while updating booking status.", error);
        }
    };

    const handleAssignOnClick = (bookingId) => {
        removeBookingIdFromAllHosts(bookingId);
        const url = config.assignUrl(bookingId);
        handleAction(url, true);
    }

    const handleRejectOnClick = (bookingId) => {
        const url = config.rejectUrl(bookingId);
        handleAction(url, true);
    }

    /* Removing undo functionality for now. TODO: Decide if it's needed or not
    const handleUndoOnClick = (bookingId) => {
        const url = config.undoUrl(bookingId);
        handleAction(url);

        const idx = undoRequests.findIndex(obj => obj.id === parseInt(bookingId));
        if (idx > -1) {
            undoRequests.splice(idx, 1);
        }
        setUndoRequests(undoRequests);
    }
    */

    const handleCheckboxOnClick = (hostId, bookingId) => {
        setCheckedBookings(prev => {
            const currentChecked = prev[hostId] || [];
            if (currentChecked.includes(bookingId)) {
              // Remove the booking ID if it's already in the array
              return {
                ...prev,
                [hostId]: currentChecked.filter(id => id !== bookingId),
              };
            } else {
              // Add the booking ID if it's not in the array
              return {
                ...prev,
                [hostId]: [...currentChecked, bookingId],
              };
            }
        });
    }

    // Function to toggle all checkboxes for the host
    const handleSelectAll = (isChecked, hostId, bookings) => {
        setCheckedBookings(prev => ({
            ...prev,
            [hostId]: isChecked ? bookings.map(booking => booking.id) : [],
        })); 
    };

    const onAssignAllMarkedClick = (hostId) => {
        if (checkedBookings[hostId] === undefined || checkedBookings[hostId].length === 0) {
            return;
        }
        let bookingIds = [];
        for (const bookingId of checkedBookings[hostId]) {
            bookingIds.push({'booking_id': bookingId});
        }
        const url = config.batchAssignUrl;
        handleAction(url, false, bookingIds);
    }

    const fetchPendingRequests = useCallback(async () => {
        try {
            const response = await axios.get(config.fetchUrl);
            if (response.status === 200) {
                setRequests(response.data);
                setUniqueHosts([...new Set(response.data.map(item => item.product.host.id))]);
            }
        } catch (error) {
            console.error("Error while fetching pending bookings.", error);
        }
    }, [config.fetchUrl]);

    useEffect(() => {
        fetchPendingRequests();
    }, [fetchPendingRequests]);

    if (requests.length === 0) {
        <div>Inga förfrågningar just nu.</div>
    }

    if (compact == true) {
        return <RequestListCompact requests={requests} />
    }

    if (requests === undefined) {
        return <div>Fetching data ...</div>
    }

    if (requests.length === 0) {
        return <div>Det finns inga bokningar att hantera.</div>
    }

    return (
        <div className="grid grid-cols-1 gap-2">
            { uniqueHosts.map(hostId => {
                const hostRequests = requests.filter(request => request.product.host.id === hostId);
                const hostName = hostRequests[0]?.product.host.name || 'Okänt Härbärge';
                
                return (
                    <div key={hostId}>
                        <Panel title={hostName}>
                            <div className='
                                grid
                                grid-cols-[1fr_2fr_4fr_2fr_2fr_3fr_3fr_3fr_5fr]
                                py-2
                                pl-1
                                text-sm
                                '>
                                <div className='grid grid-rows-1 items-center text-center'>
                                    <input
                                        className='size-4 ml-3'
                                        type="checkbox"
                                        checked={checkedBookings[hostId]?.length === hostRequests.length}
                                        onChange={(e) => handleSelectAll(e.target.checked, hostId, hostRequests)}/>
                                </div>
                                <div className='grid grid-rows-1 text-left ml-2'>
                                    Mottagen
                                </div>
                                <div className='grid grid-rows-1 items-center text-left pl-2'>
                                    Gäst
                                </div>
                                <div className='grid grid-rows-1 items-center text-left'>
                                    Unokod
                                </div>
                                <div className='grid grid-rows-1 items-center text-left'>
                                    Status
                                </div>
                                <div className='grid grid-rows-1 items-center text-left'>
                                    Detaljer
                                </div>
                                <div className='grid grid-rows-1 items-center text-left'>
                                    Incheckning
                                </div>
                                <div className='grid grid-rows-1 items-center text-left'>
                                    Utcheckning
                                </div>
                            </div>
                            {
                                hostRequests.map((booking, index) => (
                                    <div key={booking.id} className="mt-2">
                                        <BookingRow
                                            booking={booking}
                                            bg_color={index % 2 === 0 ? 'bg-grey-row' : 'bg-white'}
                                            checkedBookings={checkedBookings[hostId]}
                                            onCheckboxClick={handleCheckboxOnClick}
                                            onAssignClick={handleAssignOnClick}
                                            onRejectClick={handleRejectOnClick}
                                        />                
                                    </div>
                                ))
                            }
                            <div className="max-w-full p-2 border-t-2"/>                            
                            <div className='w-full flex justify-end'>
                                <button className={`
                                        text-white
                                        font-semibold
                                        text-sm
                                        align-middle
                                        px-3
                                        h-7
                                        rounded
                                        focus:outline-none
                                        focus:shadow-outline
                                        ml-auto
                                        mr-3
                                        ${checkedBookings[hostId] === undefined || checkedBookings[hostId].length === 0 
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700'}
                                    `}
                                    disabled={
                                        checkedBookings[hostId] === undefined
                                        || checkedBookings[hostId].length === 0}
                                    onClick={() => onAssignAllMarkedClick(hostId)}>
                                    Tilldela alla markerade
                                </button>
                            </div>
                        </Panel>

                </div>
            )})}
            {/* Removing undo functionality for now. TODO: Decide if it's needed or not
            { undoRequests.length > 0 &&
                <h2 className='text-2xl mb-4 mt-8'>Senaste ändringar</h2>
            }
            { undoRequests.map(undoRequest => (
                <div key={undoRequest.id} >
                    <UndoRow
                        undoRequest={undoRequest}
                        onUndoClick={handleUndoOnClick}
                    />
                </div>
            ))}
            */}
        </div>
        
    );
}

