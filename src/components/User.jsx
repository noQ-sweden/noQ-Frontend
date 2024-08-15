import React from 'react';
import PropTypes from "prop-types";

const User = ({ userName, password, groups }) => {
    User.propTypes = {
        userName: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        groups: PropTypes.array.isRequired,
    };

    return (
        <div>
            <h2>User Details</h2>
            <p>Username: {userName}</p>
            <p>Password: {password}</p>
            <p>Groups: {groups.join(', ')}</p> {/* Assuming groups is an array */}
        </div>
    );
};

export default User;
