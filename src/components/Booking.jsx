import React from 'react';
import Product from './Product'; // Import Product component
import UserDetails from './UserDetails'; // Import UserDetails component

const Booking = ({ startDate, product, user }) => {
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
