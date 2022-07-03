import React, { createContext, useState, useEffect } from 'react';

// Import Data
import { housesData } from '../data';

// Create Context
export const HouseContext = createContext();

// Provider
const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price range (any)');
  const [loading, setLoading] = useState(false);

  // Return all countries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });

    // Remove Duplicates
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)];

    // Set Countries State
    setCountries(uniqueCountries);
  }, []);

  useEffect(() => {
    // Return Only Countries
    const allProperties = houses.map((house) => {
      return house.type;
    });

    // Remove Duplicates
    const uniqueProperties = ['Property type (any)', ...new Set(allProperties)];

    // Set Countries State
    setProperties(uniqueProperties);
  }, []);

  // Check String if Includes '(any)'
  const handleClick = () => {
    setLoading(true);
    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
    };

    // Get First String (price) and Parse it to Number
    const minPrice = parseInt(price.split(' ')[0]);
    // Get Last String (price) and Parse it to Number
    const maxPrice = parseInt(price.split(' ')[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      // All Values are Selected
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }
      // All Values are Default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }
      // Country is NOT Default
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }
      // Property is NOT Default
      if (!isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.type === property;
      }
      // Price is NOT Default
      if (!isDefault(price) && isDefault(country) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }
      // Country and Property is NOT Default
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }
      // Country and Price is NOT Default
      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }
      // Property and Price is NOT Default
      if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });

    // Create ShowMessage Function to Render a "Nothing found" mMssage to the Screen
    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        handleClick,
        houses,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;