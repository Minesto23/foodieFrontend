import React, { createContext, useContext, useState, useEffect } from "react";
import { UseRestaurant } from "../hooks/UseRestaurant"; // Hook para manejar la lógica de restaurantes

// Crear el contexto
const RestaurantContext = createContext();

/**
 * Proveedor del contexto de restaurantes
 *
 * Proporciona el estado de los restaurantes y funciones relacionadas a los componentes hijos.
 *
 * @param {ReactNode} children - Componentes hijos que tendrán acceso al contexto.
 */
export const RestaurantProvider = ({ children }) => {
  const { fetchAllRestaurants, restaurants } = UseRestaurant(); // Hook personalizado
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga inicial
  const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false);
  /**
   * Efecto para obtener los restaurantes al montar el componente
   */
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        await fetchAllRestaurants(); // Llama a la función de fetch desde el hook
      } catch (error) {
        console.error("Error al obtener restaurantes:", error);
      } finally {
        setIsLoading(false); // Finaliza el estado de carga
      }
    };

    fetchRestaurants();
  }, [fetchAllRestaurants, isRestaurantModalOpen, setRestaurantModalOpen]); // Dependencia para asegurar que la función esté actualizada

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        isLoading,
        fetchAllRestaurants,
        isRestaurantModalOpen,
        setRestaurantModalOpen,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

/**
 * Hook personalizado para consumir el contexto de restaurantes
 *
 * @returns {object} - Estado y funciones relacionadas a los restaurantes.
 */
export const useRestaurantContext = () => {
  return useContext(RestaurantContext);
};
