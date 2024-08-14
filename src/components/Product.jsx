import React from 'react';
import Host from './Host';
import PropTypes from "prop-types";

const Product = ({ name, description, totalPlaces, host, type }) => {
    Product.propTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        totalPlaces: PropTypes.number.isRequired,
        host: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
    };

    return (
        <div>
            <h2>Product Details</h2>
            <p>Name: {name}</p>
            <p>Description: {description}</p>
            <p>Total Places: {totalPlaces}</p>
            <Host {...host} />
            <p>Type: {type}</p>
        </div>
    );
};

export default Product;
