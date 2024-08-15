import React from "react";
import Product from "./Product";
import PropTypes from "prop-types";

const Available = ({ availableDate, product, placesLeft }) => {
  Available.propTypes = {
    availableDate: PropTypes.string.isRequired,
    product: PropTypes.object.isRequired,
    placesLeft: PropTypes.number.isRequired,
  };

  return (
    <div>
      <h2>Availability Details</h2>
      <p>Available Date: {availableDate}</p>
      <Product {...product} />
      <p>Places Left: {placesLeft}</p>
    </div>
  );
};

export default Available;
