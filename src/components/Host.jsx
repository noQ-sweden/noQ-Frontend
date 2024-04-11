import React from 'react';

const Host = ({ user, name, street, postcode, city, region }) => {
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
