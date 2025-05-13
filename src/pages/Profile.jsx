import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ user, firstName, lastName, gender, street, postcode, city, country, phone, email, unokod, dayOfBirth, personnrLastnr, region, lastEdit }) => {
    Profile.propTypes = {
        user: PropTypes.object.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        postcode: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        unokod: PropTypes.string.isRequired,
        dayOfBirth: PropTypes.string.isRequired,
        personnrLastnr: PropTypes.string.isRequired,
        region: PropTypes.string.isRequired,
        lastEdit: PropTypes.string.isRequired,
    };

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

export default Profile;
