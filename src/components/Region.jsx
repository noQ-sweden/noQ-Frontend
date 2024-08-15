import React from 'react';
import PropTypes from "prop-types";

const Region = ({ name }) => {    
    Region.propTypes = {
        name: PropTypes.string.isRequired,
    };

    return (
        <div>
            <h2>Region Details</h2>
            <p>Name: {name}</p>
        </div>
    );
};

export default Region;
