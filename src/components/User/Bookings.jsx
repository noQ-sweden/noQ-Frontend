import React, { useState, useEffect, useCallback } from 'react';
import axios from './../../api/AxiosNoqApi';
import BookingCard from "./BookingCard";
import Panel from "../Common/Panel";
import useHeader from "../../hooks/useHeader";
//import PropTypes from "prop-types";

export default function Bookings() {
    const { setHeader } = useHeader();
    setHeader("Bokningar");

    const [bookings, setBookings] = useState([]);

    const fetchBookings = useCallback(async () => {
        try {
            const response = await axios.get("api/user/bookings");
            if (response.status === 200) {
                setBookings(response.data);
            }
        } catch (error) {
            console.error("Error while fetching bookings.", error);
        }
    }, [setBookings]);

    const confirmBooking = useCallback(async (bookingId) => {
        try {
            const response = await axios.get(`/api/user/bookings/confirm/${bookingId}`);
            if (response.status === 200) {
                // Remove deleted booking from state
                setBookings(response.data);
            }
        } catch (error) {
            console.error("Error confirming booking.", error);
        }
      }, []);

    const deleteBooking = useCallback(async (bookingId) => {
      try {
          const response = await axios.delete(`/api/user/bookings/${bookingId}`);
          if (response.status === 200) {
              // Remove deleted booking from state
              setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
          }
      } catch (error) {
          console.error("Error deleting booking.", error);
      }
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    if (bookings.length === 0) {
        <div>Du har inga bokningar.</div>
    }

    if (bookings === undefined) {
        return <div>Fetching data ...</div>
    }

    return (
        <Panel title="Mina Bokningar">
            <div className="grid grid-cols-1 gap-5 p-3">
                { bookings.map(booking => {                
                    return (
                        <div key={booking.id}>
                            <BookingCard
                                booking={booking}
                                onDelete={() => deleteBooking(booking.id)}
                                onConfirm={() => confirmBooking(booking.id)} />
                        </div>
                    )}
                )}
            </div>
        </Panel>
    );
}

