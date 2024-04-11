import React from 'react';
import Host from './Host'; // Import Host component

const Product = ({ name, description, totalPlaces, host, type }) => {
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
