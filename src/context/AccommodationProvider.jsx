// AccommodationContext.js
import React, { createContext, useState } from 'react';
import PropTypes from "prop-types";

// Create a context
export const AccommodationContext = createContext();

// Provider component
export const AccommodationProvider = ({ children }) => {
  AccommodationProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [accommodation, setAccommodation] = useState([]);

  return (
    <AccommodationContext.Provider value={{ accommodation, setAccommodation }}>
      {children}
    </AccommodationContext.Provider>
  );
};