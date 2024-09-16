import React, { useState, useEffect } from 'react';
import axios from './../../api/AxiosNoqApi';
import Panel from "../Common/Panel"; 

export default function OutgoingGuests() {

    const [outgoingBookings, setOutgoingBookings] = useState([]);

    // useEffect( () => {
    //     axios.get ('/api/host/bookings/outgoing')
    //     .then ( (response) => {
    //         if (response.status === 200) {
    //             setOutgoingBookings(response?.data)

    // I am implementing mock data just to ensure it works, once it's not needed
    // the above block of code can be un-commented
    useEffect(() => {
        // Mock data for outgoing guests
        const mockOutgoingBookings = [
            {
                id: 1,
                user: { first_name: "John", last_name: "Doe" },
                checkoutTime: null  // Initially null to represent the user hasn't checked out yet
            },
            {
                id: 2,
                user: { first_name: "Sven", last_name: "Svensson" },
                checkoutTime: null  // No checkout time yet
            },
            {
                id: 3,
                user: { first_name: "Anders", last_name: "Andersson" },
                checkoutTime: null
            }
        ];

        // Simulate an API call with a delay
        setTimeout(() => {
            setOutgoingBookings(mockOutgoingBookings);
        }, 1000);  // 1-second delay to mimic network request
    }, []);

    // Function to handle Check Out
    const handleCheckOut = (bookingId) => {
        const checkoutTime = new Date().toISOString();  // Capture current time as ISO string

        // Simulate a "successful" checkout action
        setOutgoingBookings(prevBookings =>
            prevBookings.map(booking =>
                booking.id === bookingId ? { ...booking, checkoutTime } : booking
            )
        );
    };

    return (
        <Panel title="Utgående gäster">
            <div>
                <div className='text-sm'>
                    <table className='table-fixed w-full'>
                        <thead className='border-b-2'>
                            <tr className='text-left'>
                                <th className='font-normal tracking-tight w-3/5'>Namn</th>
                                <th className='p-2 font-normal tracking-tight w-2/5'></th>
                            </tr>
                        </thead>
                        <tbody className='border-b-2'>
                            {outgoingBookings.map(booking => (
                                <tr key={booking.id}>
                                    <td className='tracking-tight'>
                                        {booking.user.first_name} {booking.user.last_name}
                                    </td>
                                    <td className='p-2 tracking-tight text-right'>
                                        {booking.checkoutTime ? (
                                            <span className="text-gray-600 text-sm">
                                                Utcheckad: {new Date(booking.checkoutTime).toLocaleString()}
                                            </span>
                                        ) : (
                                            <button className="
                                                bg-green-600
                                                hover:bg-green-700
                                                text-white
                                                font-semibold
                                                text-m
                                                align-middle
                                                w-32
                                                h-7
                                                rounded
                                                focus:outline-none
                                                focus:shadow-outline"
                                                onClick={() => handleCheckOut(booking.id)}>
                                                Checka ut
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {outgoingBookings.length === 0 && (
                                <tr>
                                    <td>Inga gäster ska checka-ut idag.</td>
                                    <td />
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Panel>
    );
}
