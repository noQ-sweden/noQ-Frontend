import React, { useState, useEffect } from 'react';
import axios from './../../api/AxiosNoqApi';
import Panel from "../Common/Panel";
import useUpdate from "./../../hooks/useUpdate";
import { getStatus } from './../../utility/utilityFunctions';
import {useTranslation} from "react-i18next";

export default function IncomingGuests() {
    const [incomingBookings, setIncomingBookings] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); 
    const [selectedUser, setSelectedUser] = useState(null); 
    const { updateData, setUpdateData } = useUpdate();
    const { t } = useTranslation();
    
    useEffect(() => {
        axios.get('/api/host/bookings/incoming')
            .then((response) => {
                if (response.status === 200) {
                    setIncomingBookings(response?.data);
                }
            })
            .catch((error) => {
                console.log("Error while fetching incoming bookings data.", error);
            });
    }, [updateData]); 

    const handleCheckIn = (bookingId) => {
        axios.patch(`/api/host/bookings/${bookingId}/checkin`)
            .then((res) => {
                if (res.status === 200) {
                    setIncomingBookings(prevBookings =>
                        prevBookings.map(booking =>
                            booking.id === bookingId
                                ? {
                                    ...booking,
                                    status: {
                                        ...booking.status,
                                        description: ""
                                    },
                                    user: {
                                        ...booking.user,
                                        first_name: "",
                                        last_name: ""
                                    },
                                    isChecked: true
                                } : booking
                        )
                    );
                    setUpdateData(updateData + 1); 
                }
            })
            .catch((error) => {
                console.log("Error while checking in the guest.", error);
            });
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    return (
        <Panel title="Inkommande gäster">
            <div>
                <div className='text-sm '>
                    <table className='table-fixed'>
                        <thead className='border-b-2'>
                            <tr className='text-left'>
                                <th className='font-normal tracking-tight w-full'>Namn</th>
                                <th className='p-2 font-normal tracking-tight w-1/5'>Bokningsstatus</th>
                                <th className='p-2 font-normal tracking-tight w-1/5'></th>
                            </tr>
                        </thead>
                        <tbody className='border-b-2'>
                            {incomingBookings.map(booking => (
                                <tr key={booking.id}>
                                    <td className='tracking-tight '>
                                        <button onClick={() => handleUserClick(booking.user)} className="text-blue-500">
                                            {booking.user.first_name} {booking.user.last_name}
                                        </button>
                                    </td>
                                    <td className='tracking-tight '>{getStatus(booking.status.description, t)}</td>
                                    <td className='p-2 tracking-tight text-right'>
                                        {!booking.isChecked && (
                                            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-m align-middle w-32 h-7 rounded focus:outline-none focus:shadow-outline"
                                                onClick={() => handleCheckIn(booking.id)}>
                                                Incheckning
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {incomingBookings.length === 0 && (
                                <tr>
                                    <td colSpan="3">Inga gäster ska checka-in idag.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal to show user details */}
            {modalOpen && selectedUser && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold">User Details</h2>
                        <p><strong>Name:</strong> {selectedUser.first_name} {selectedUser.last_name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Gender:</strong> {selectedUser.gender}</p>
                        <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => setModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Panel>
    );
}
