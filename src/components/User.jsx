import React from 'react';

const User = ({ userName, password, groups }) => {
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
