// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import Product from "./Product";
// import UserDetails from "./UserDetails";

// const Booking = ({ startDate, product, user }) => {
//     const [status, setStatus] = useState("Pending"); // Default status

//     useEffect(() => {
//         const eventSource = new EventSource("http://localhost:8000/sse/booking-updates/");

//         eventSource.onmessage = (event) => {
//             const data = JSON.parse(event.data);

//             if (data.user === user.id) {
//                 setStatus(data.status); // Update status only if it matches the current user
//             }
//         };

//         eventSource.onerror = () => {
//             console.error("EventSource failed.");
//             eventSource.close();
//         };

//         return () => {
//             eventSource.close();
//         };
//     }, [user.id]);

//     return (
//         <div>
//             <h2>Booking Details</h2>
//             <p>Start Date: {startDate}</p>
//             <p>Status: <strong>{status}</strong></p> {/* Display real-time status */}
//             <Product {...product} />
//             <UserDetails {...user} />
//         </div>
//     );
// };

// Booking.propTypes = {
//     startDate: PropTypes.string.isRequired,
//     product: PropTypes.object.isRequired,
//     user: PropTypes.object.isRequired,
// };

// export default Booking;



import React from 'react';
import Product from './Product';
import UserDetails from './UserDetails';
import PropTypes from "prop-types";

const Booking = ({ startDate, product, user }) => {
    Booking.propTypes = {
        startDate: PropTypes.string.isRequired,
        product: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    };
    
    return (
        <div>
            <h2>Booking Details</h2>
            <p>Start Date: {startDate}</p>
            <Product {...product} />
            <UserDetails {...user} />
        </div>
    );
};

export default Booking;
