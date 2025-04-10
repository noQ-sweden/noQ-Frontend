import React, { useState, useEffect } from 'react';
import axios from './../../api/AxiosNoqApi';
import Panel from "../Common/Panel";
import useUpdate from "./../../hooks/useUpdate";
import { getStatus } from './../../utility/utilityFunctions';


export default function IncomingGuests() {

    const [ incomingBookings, setIncomingBookings ] = useState([]);
    const { updateData, setUpdateData } = useUpdate();

    useEffect( () => {
        axios.get ('/api/host/bookings/incoming')
        .then ( (response) => {
            if (response.status === 200) {
                setIncomingBookings(response?.data);
            }
        })
        .catch((error) => {
            console.log("Error while fetching incoming bookings data.", error);
        });
    }, [setIncomingBookings]);

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
                                     description:  "" 
                                    },
                                    user:{
                                        ...booking.user, 
                                        first_name: "",
                                        last_name: "" 
                                    },
                                    isChecked: true

                                    }: booking
                                    

                        )
                        
                    )
                    setUpdateData(updateData + 1);
                }
            })
            .catch((error) => {
                console.log("Error while checking in the guest.", error)
            })
    }

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
                            { incomingBookings.map(booking => (
                                <tr key={booking.id}>
                                    <td className='tracking-tight '>{booking.user.first_name} {booking.user.last_name}</td>
                                    <td className='tracking-tight '>{getStatus(booking.status.description, t)}</td>
                                    <td className='p-2 tracking-tight text-right'>
                                        {!booking.isChecked &&(
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
                                            onClick={() => handleCheckIn(booking.id)}>
                                            Incheckning
                                        </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            { incomingBookings.length == 0 && (
                                <tr>
                                    <td>Inga gäster ska checka-in idag.</td>
                                    <td/>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Panel>
    );
}
