import Axios from "../Axios";

/**
 * Obtiene todos los elementos del menú disponibles en el sistema.
 *
 * @returns {Promise<Array>} Lista de elementos del menú.
 * @throws {Error} Si ocurre un error al realizar la solicitud.
 */
export const getAllMenuItems = async () => {
  try {
    const response = await Axios.get("/api/menu-items/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los elementos del menú:", error);
    throw error;
  }
};

/**
 * Crea un nuevo elemento del menú en el sistema.
 *
 * @param {Object} menuItemData - Datos del elemento del menú a crear.
 * @returns {Promise<Object>} El elemento del menú creado.
 * @throws {Error} Si ocurre un error al realizar la solicitud.
 */
export const createMenuItem = async (menuItemData) => {
  try {
    const formData = new FormData();

    // Agregar todos los campos al FormData, incluyendo archivos (como logo).
    for (const key in menuItemData) {
      if (menuItemData[key] !== null) {
        formData.append(key, menuItemData[key]);
      }
    }

    const response = await Axios.post("/api/menu-items/", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Especificar que se envían archivos.
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el elemento del menú:", error);
    throw error;
  }
};

/**
 * Obtiene un elemento del menú específico por su ID.
 *
 * @param {string} menuItemId - ID del elemento del menú a buscar.
 * @returns {Promise<Object>} El elemento del menú encontrado.
 * @throws {Error} Si ocurre un error al realizar la solicitud o si no se encuentra el elemento.
 */
export const getMenuItemById = async (menuItemId) => {
  try {
    const response = await Axios.get(`/api/menu-items/${menuItemId}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el elemento del menú:", error);
    throw error;
  }
};

/**
 * Actualiza un elemento del menú existente por su ID.
 *
 * @param {string} menuItemId - ID del elemento del menú a actualizar.
 * @param {Object} updatedData - Datos actualizados del elemento del menú.
 * @returns {Promise<Object>} El elemento del menú actualizado.
 * @throws {Error} Si ocurre un error al realizar la solicitud.
 */
export const updateMenuItem = async (menuItemId, updatedData) => {
  try {
    const formData = new FormData();

    // Agregar todos los campos al FormData, incluyendo archivos (como logo).
    for (const key in updatedData) {
      if (updatedData[key] !== null) {
        formData.append(key, updatedData[key]);
      }
    }

    const response = await Axios.put(
      `/api/menu-items/${menuItemId}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Especificar que se envían archivos.
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el elemento del menú:", error);
    throw error;
  }
};

/**
 * Elimina un elemento del menú existente por su ID.
 *
 * @param {string} menuItemId - ID del elemento del menú a eliminar.
 * @returns {Promise<Object>} Respuesta de eliminación.
 * @throws {Error} Si ocurre un error al realizar la solicitud.
 */
export const deleteMenuItem = async (menuItemId) => {
  try {
    const response = await Axios.delete(`/api/menu-items/${menuItemId}/`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el elemento del menú:", error);
    throw error;
  }
};
