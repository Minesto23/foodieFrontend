import { useCallback, useState } from "react";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../api/controllers/Categories";
import axios from "../api/Axios";

/**
 * Hook para manejar las categorías del menú de un restaurante seleccionado.
 *
 * @param {Object} selectedRestaurant - Restaurante actualmente seleccionado.
 * @returns {Object} - Estado y funciones relacionadas con las categorías.
 */
export const UseCategories = (selectedRestaurant) => {
  const [menuCategories, setMenuCategories] = useState([]); // Lista de categorías
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  /**
   * Fetch all categories for the selected restaurant.
   */
  const fetchAllCategories = useCallback(async () => {
    if (!selectedRestaurant?.id) return; // Verificar que haya un restaurante seleccionado

    setLoading(true);
    setError(null);
    try {
      const data = await getAllCategories(); // Obtener todas las categorías
      const filteredCategories = data.filter(
        (category) => category.restaurant === selectedRestaurant.id
      ); // Filtrar categorías del restaurante seleccionado
      setMenuCategories(filteredCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Error fetching categories");
    } finally {
      setLoading(false);
    }
  }, [selectedRestaurant]);

  /**
   * Agregar una nueva categoría al restaurante seleccionado.
   *
   * @param {Object} newCategory - Datos de la nueva categoría.
   */
  const addCategory = useCallback(
    async (newCategory) => {
      setError(null);
      try {
        const data = await createCategory(newCategory); // Crear nueva categoría
        setMenuCategories((prevCategories) => [...prevCategories, data]); // Actualizar estado
      } catch (err) {
        console.error("Error creating category:", err);
        setError("Error creating category");
      }
    },
    [setMenuCategories]
  );

  /**
   * Modificar una categoría existente.
   *
   * @param {number} id - ID de la categoría a modificar.
   * @param {Object} updatedData - Datos actualizados de la categoría.
   * @returns {Object} - Categoría actualizada.
   */
  const modifyCategory = async (id, updatedData) => {
    setError(null);
    try {
      const response = await axios.put(
        `api/menu-categories/${id}/`,
        updatedData
      ); // Actualizar categoría
      setMenuCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? response.data : category
        )
      ); // Actualizar estado
      return response.data;
    } catch (err) {
      console.error("Error updating category:", err);
      setError("Error updating category");
      throw err;
    }
  };

  /**
   * Eliminar una categoría existente.
   *
   * @param {number} id - ID de la categoría a eliminar.
   */
  const removeCategory = useCallback(
    async (id) => {
      setError(null);
      try {
        await deleteCategory(id); // Eliminar categoría
        setMenuCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        ); // Actualizar estado
      } catch (err) {
        console.error("Error deleting category:", err);
        setError("Error deleting category");
      }
    },
    [setMenuCategories]
  );

  return {
    menuCategories, // Lista de categorías
    loading, // Indicador de carga
    error, // Mensaje de error
    fetchAllCategories, // Función para obtener todas las categorías
    addCategory, // Función para agregar una categoría
    modifyCategory, // Función para modificar una categoría
    removeCategory, // Función para eliminar una categoría
  };
};

export default UseCategories;
