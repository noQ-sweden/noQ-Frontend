import React, { useState, useEffect } from 'react';
import axios from './../../api/AxiosNoqApi';
import Panel from "../Common/Panel";
import useUpdate from "./../../hooks/useUpdate";
import { getStatus } from './../../utility/utilityFunctions';

export default function OutgoingGuests() {

    const [outgoingBookings, setOutgoingBookings] = useState([])
    const { updateData, setUpdateData } = useUpdate();
    const { t } = useTranslation();
    

    useEffect(() => {
        axios.get('/api/host/bookings/outgoing')
            .then((response) => {
                if (response.status === 200) {
                    setOutgoingBookings(response?.data);
                }
            })
            .catch((error) => {
                console.log("Error while fetching outgoing bookings data.", error);
            });
    }, [setOutgoingBookings]);

    const handleCheckOut = (bookingId) => {
        axios.patch(`/api/host/bookings/${bookingId}/checkout`)
            .then((res) => {
                if (res.status === 200) {
                    setOutgoingBookings(prevBookings =>
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
                                isCheckedOut: true
                            } : booking
                        )
                    );
                    setUpdateData(updateData + 1);
                }
            })
            .catch((error) => {
                console.log("Error while checking out the guest.", error);
            });
    }

    return (
        <Panel title="Utgående gäster">
            <div>
                <div className='text-sm'>
                    <table className='table-fixed w-full'>
                        <thead className='border-b-2'>
                            <tr className='text-left'>
                                <th className='font-normal tracking-tight w-3/5'>Namn</th>
                                <th className='p-2 font-normal tracking-tight w-1/5'>Bokningsstatus</th>
                                <th className='p-2 font-normal tracking-tight w-2/5'></th>
                            </tr>
                        </thead>
                        <tbody className='border-b-2'>
                            {outgoingBookings.map(booking => (
                                <tr key={booking.id}>
                                    <td className='tracking-tight'>{booking.user.first_name} {booking.user.last_name}</td>
                                    <td className='tracking-tight '>{getStatus(booking.status.description, t)}</td>
                                    <td className='p-2 tracking-tight text-right'>
                                        {!booking.isCheckedOut && (
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
                                                Utcheckning
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
