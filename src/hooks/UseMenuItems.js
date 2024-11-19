import { useState, useCallback } from "react";
import {
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../api/controllers/MenuItems";
import { getCategoryById } from "../api/controllers/Categories";

/**
 * Hook para manejar los elementos del menú.
 *
 * @returns {Object} - Estado y funciones para operar sobre los elementos del menú.
 */
export const UseMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]); // Lista de elementos del menú
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [addingItem, setAddingItem] = useState(false); // Indicador de creación en progreso

  /**
   * Fetch all menu items y sus nombres de categoría.
   */
  const fetchAllMenuItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllMenuItems();

      // Enriquecer cada elemento del menú con el nombre de la categoría
      const menuItemsWithCategoryNames = await Promise.all(
        data.map(async (menuItem) => {
          const category = await getCategoryById(menuItem.category);
          return { ...menuItem, categoryName: category.name };
        })
      );

      setMenuItems(menuItemsWithCategoryNames);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Agregar un nuevo elemento al menú.
   *
   * @param {Object} newItem - Datos del nuevo elemento.
   */
  const addMenuItem = useCallback(
    async (newItem) => {
      if (addingItem) return; // Prevenir múltiples llamadas simultáneas
      setAddingItem(true);
      try {
        const data = await createMenuItem(newItem);
        setMenuItems((prevItems) => [...prevItems, data]); // Agregar nuevo elemento al estado
      } catch (error) {
        console.error("Error creating menu item:", error);
      } finally {
        setAddingItem(false);
      }
    },
    [addingItem]
  );

  /**
   * Modificar un elemento existente del menú.
   *
   * @param {number} id - ID del elemento a modificar.
   * @param {Object} updatedData - Datos actualizados del elemento.
   */
  const modifyMenuItem = useCallback(async (id, updatedData) => {
    try {
      const data = await updateMenuItem(id, updatedData);
      setMenuItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? data : item))
      ); // Actualizar el estado con el elemento modificado
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  }, []);

  /**
   * Eliminar un elemento del menú.
   *
   * @param {number} id - ID del elemento a eliminar.
   */
  const removeMenuItem = useCallback(async (id) => {
    try {
      await deleteMenuItem(id);
      setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Filtrar el elemento eliminado
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  }, []);

  return {
    menuItems, // Lista de elementos del menú
    loading, // Indicador de carga
    fetchAllMenuItems, // Función para obtener todos los elementos
    addMenuItem, // Función para agregar un elemento
    modifyMenuItem, // Función para modificar un elemento
    removeMenuItem, // Función para eliminar un elemento
  };
};

export default UseMenuItems;
