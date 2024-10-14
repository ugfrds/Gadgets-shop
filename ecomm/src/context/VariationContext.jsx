import React, { createContext, useState, useContext } from 'react';

// Create a context
const VariationContext = createContext();

// Create a provider component
export const VariationProvider = ({ children }) => {
  const [selectedVariation, setSelectedVariation] = useState('');

  return (
    <VariationContext.Provider value={{ selectedVariation, setSelectedVariation }}>
      {children}
    </VariationContext.Provider>
  );
};

// Create a custom hook to use the variation context
export const useVariation = () => useContext(VariationContext);
