import React, { createContext, useContext, useState, useEffect } from 'react';
import { UseRestaurant } from '../hooks/UseRestaurant'; // Suponiendo que ya tienes este hook creado

// Crear el contexto
const RestaurantContext = createContext();

// Proveedor del contexto
export const RestaurantProvider = ({ children }) => {
  const { fetchAllRestaurants, restaurants } = UseRestaurant();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch restaurantes cuando el proveedor se monta
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        await fetchAllRestaurants();
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [fetchAllRestaurants]);

  return (
    <RestaurantContext.Provider value={{ restaurants, isLoading, fetchAllRestaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};

// Hook para usar el contexto
export const useRestaurantContext = () => {
  return useContext(RestaurantContext);
};
