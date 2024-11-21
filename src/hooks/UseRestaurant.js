import { useCallback, useState } from "react";
import { getAllRestaurants } from "../api/controllers/Restaurants";

/**
 * Hook para manejar las operaciones relacionadas con los restaurantes.
 *
 * @returns {Object} - Estado y funciones para operar sobre los restaurantes.
 */
export const UseRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]); // Estado para almacenar la lista de restaurantes
  const [loading, setLoading] = useState(false); // Estado para indicar carga

  /**
   * Fetch all restaurants desde la API.
   */
  const fetchAllRestaurants = useCallback(async () => {
    setLoading(true); // Cambiar el estado a cargando
    try {
      const data = await getAllRestaurants(); // Llamada al controlador para obtener restaurantes
      setRestaurants(data); // Actualizar el estado con los datos obtenidos
    } catch (error) {
      console.error("Error fetching restaurants:", error); // Manejo básico de errores
    } finally {
      setLoading(false); // Asegurar que el estado de carga se restablezca
    }
  }, []);

  return {
    fetchAllRestaurants, // Función para obtener todos los restaurantes
    restaurants, // Lista de restaurantes
    loading, // Indicador de carga
  };
};
