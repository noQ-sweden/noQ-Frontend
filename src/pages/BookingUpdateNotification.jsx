import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";


const BookingUpdate = ({ startDate, product, user }) => {
    const [status, setStatus] = useState("pending"); 

    // Ensure user is defined and has the id property before proceeding
    useEffect(() => {
        if (user && user.id) {
            const eventSource = new EventSource("http://localhost:8000/sse/booking_updates/");

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.user === user.id) {
                    setStatus(data.status); 
                }
            };

            eventSource.onerror = () => {
                console.error("EventSource failed.");
                eventSource.close();
            };

            return () => {
                eventSource.close();
            };
        } else {
            console.warn("User is not defined or doesn't have an id.");
        }
    }, [user]);

    return (
        <div>
            <h2>Booking Details</h2>
            
            <p>Status: <strong>{status}</strong></p> 
        </div>
    );
};

BookingUpdate.propTypes = {
    startDate: PropTypes.string.isRequired,
    product: PropTypes.object.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default BookingUpdate;
