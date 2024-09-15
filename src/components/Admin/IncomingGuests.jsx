import React, { useState, useEffect } from 'react';
import axios from './../../api/AxiosNoqApi';
import Panel from "../Common/Panel";





export default function IncomingGuests() {

    const [incomingBookings, setIncomingBookings] = useState([])

    useEffect( () => {
        axios.get ('/api/host/bookings/incoming')
        .then ( (response) => {
            console.log(response)
            
            if (response.status === 200) {
                setIncomingBookings(response?.data)
            }
            
        })
        .catch((error) => {
            console.log("Error while fetching incoming bookings data.", error);
        });
    }, []);

    const handleCheckIn = (bookingId) => {
        //TODO
        axios.get(`/api/host/bookings/${bookingId}/checkin`)
        .then((response )=> {
            
            if(response.status === 200) {
                setIncomingBookings(prevBokings => 
                    prevBokings.map(booking => 
                        booking.id === bookingId
                        ? {...booking, status: {...booking.status, description: 'Checked In'}} :booking
                    )
        
                )
            }

        }) 
        .catch((error) => {
            console.log("Error while checking in.")
        })
        
    }

    return (
        <Panel title="Inkommande gäster">
            <div>
                <div className='text-sm'>
                    <table className='table-fixed w-full'>
                        <thead className='border-b-2'>
                            <tr className='text-left'>
                                <th className='font-normal tracking-tight w-3/5'>Namn</th>
                                <th className='p-2 font-normal tracking-tight w-1/5'></th>
                            </tr>
                        </thead>
                        <tbody className='border-b-2'>
                            { incomingBookings.map(booking => (
                                <tr key={booking.id}>
                                    <td className='tracking-tight'>{booking.user.first_name} {booking.user.last_name}</td>
                                    <td className='tracking-tight'>{booking.status.description}</td>
                                    <td className='p-2 tracking-tight text-right'>
                                        {booking.status.description !== 'Checked In' && (
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
