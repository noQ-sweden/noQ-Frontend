import React from "react";
import Product from "./Product"; // Import Product component

const Available = ({ availableDate, product, placesLeft }) => {
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
