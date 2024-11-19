import Axios from "../Axios";

/**
 * Obtiene todas las categorías disponibles en el sistema.
 *
 * @returns {Promise<Array>} Lista de categorías.
 * @throws {Error} Si ocurre un error al realizar la solicitud.
 */
export const getAllCategories = async () => {
  try {
    const response = await Axios.get("/api/menu-categories/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error; // Lanza el error para que pueda ser manejado por el consumidor.
  }
};

/**
 * Crea una nueva categoría en el sistema.
 *
 * @param {Object} categoryData - Datos de la categoría a crear.
 * @returns {Promise<Object>} La categoría creada.
 * @throws {Error} Si ocurre un error al realizar la solicitud.
 */
export const createCategory = async (categoryData) => {
  try {
    const response = await Axios.post("/api/menu-categories/", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
};

/**
 * Obtiene una categoría específica por su ID.
 *
 * @param {string} categoryId - ID de la categoría a buscar.
 * @returns {Promise<Object>} La categoría encontrada.
 * @throws {Error} Si ocurre un error al realizar la solicitud o si no se encuentra la categoría.
 */
export const getCategoryById = async (categoryId) => {
  try {
    const response = await Axios.get(`/api/menu-categories/${categoryId}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la categoría por ID:", error);
    throw error;
  }
};

/**
 * Actualiza una categoría existente por su ID.
 *
 * @param {string} categoryId - ID de la categoría a actualizar.
 * @param {Object} updatedData - Datos actualizados de la categoría.
 * @returns {Promise<Object>} La categoría actualizada.
 * @throws {Error} Si ocurre un error al realizar la solicitud.
 */
export const updateCategory = async (categoryId, updatedData) => {
  try {
    const response = await Axios.put(
      `/api/menu-categories/${categoryId}/`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    throw error;
  }
};

/**
 * Elimina una categoría existente por su ID.
 *
 * @param {string} categoryId - ID de la categoría a eliminar.
 * @returns {Promise<Object>} Respuesta de eliminación.
 * @throws {Error} Si ocurre un error al realizar la solicitud.
 */
export const deleteCategory = async (categoryId) => {
  try {
    const response = await Axios.delete(`/api/menu-categories/${categoryId}/`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    throw error;
  }
};
