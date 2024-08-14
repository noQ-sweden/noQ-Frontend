import React from 'react';
import PropTypes from 'prop-types';

const Host = ({ user, name, street, postcode, city, region }) => {
    Host.propTypes = {
        user: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        postcode: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        region: PropTypes.string.isRequired,
    };

    return (
        <div>
            <h2>Host Details</h2>
            <p>User: {user}</p>
            <p>Name: {name}</p>
            <p>Street: {street}</p>
            <p>Postcode: {postcode}</p>
            <p>City: {city}</p>
            <p>Region: {region}</p>
        </div>
    );
};

export default Host;
