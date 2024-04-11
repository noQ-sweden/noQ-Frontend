import React from 'react';

const UserDetails = ({ user, firstName, lastName, gender, street, postcode, city, country, phone, email, unokod, dayOfBirth, personnrLastnr, region, lastEdit }) => {
    return (
        <div>
            <h2>User Details</h2>
            <p>User: {user}</p>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Gender: {gender}</p>
            <p>Street: {street}</p>
            <p>Postcode: {postcode}</p>
            <p>City: {city}</p>
            <p>Country: {country}</p>
            <p>Phone: {phone}</p>
            <p>Email: {email}</p>
            <p>UNOKOD: {unokod}</p>
            <p>Day of Birth: {dayOfBirth}</p>
            <p>Personnr Lastnr: {personnrLastnr}</p>
            <p>Region: {region}</p>
            <p>Last Edit: {lastEdit}</p>
        </div>
    );
};

export default UserDetails;
