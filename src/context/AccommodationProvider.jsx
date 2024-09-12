// AccommodationContext.js
import React, { createContext, useState } from 'react';

// Create a context
export const AccommodationContext = createContext();

// Provider component
export const AccommodationProvider = ({ children }) => {
  const [accommodation, setAccommodation] = useState([]);

  return (
    <AccommodationContext.Provider value={{ accommodation, setAccommodation }}>
      {children}
    </AccommodationContext.Provider>
  );
};