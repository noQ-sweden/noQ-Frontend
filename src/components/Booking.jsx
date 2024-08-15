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
