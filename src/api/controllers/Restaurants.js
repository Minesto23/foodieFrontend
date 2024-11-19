import Axios from "../Axios";

/**
 * Obtiene todos los restaurantes disponibles en el sistema.
 *
 * @returns {Promise<Array>} Lista de restaurantes.
 * @throws {Error} Si ocurre un error al realizar la solicitud.
 */
export const getAllRestaurants = async () => {
  try {
    const response = await Axios.get("/api/restaurants/");
    console.log(response, "controller");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los restaurantes:", error);
    throw error;
  }
};

/**
 * Crea un nuevo restaurante en el sistema.
 *
 * @param {Object} restaurantData - Datos del restaurante a crear.
 * @returns {Promise<Object>} El restaurante creado.
 * @throws {Error} Si ocurre un error al realizar la solicitud.
 */
export const createRestaurant = async (restaurantData) => {
  try {
    const formData = new FormData();

    // Agregar todos los campos al FormData, incluyendo el archivo (logo).
    for (const key in restaurantData) {
      if (restaurantData[key] !== null) {
        formData.append(key, restaurantData[key]);
      }
    }

    const response = await Axios.post("/api/restaurants/", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Especificar que se envían archivos.
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el restaurante:", error);
    throw error;
  }
};

/**
 * Obtiene un restaurante específico por su ID.
 *
 * @param {string} restaurantId - ID del restaurante a buscar.
 * @returns {Promise<Object>} El restaurante encontrado.
 * @throws {Error} Si ocurre un error al realizar la solicitud o si no se encuentra el restaurante.
 */
export const getRestaurantById = async (restaurantId) => {
  try {
    const response = await Axios.get(`/api/restaurants/${restaurantId}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el restaurante:", error);
    throw error;
  }
};

/**
 * Actualiza un restaurante existente por su ID.
 *
 * @param {string} restaurantId - ID del restaurante a actualizar.
 * @param {Object} updatedData - Datos actualizados del restaurante.
 * @returns {Promise<Object>} El restaurante actualizado.
 * @throws {Error} Si ocurre un error al realizar la solicitud.
 */
export const updateRestaurant = async (restaurantId, updatedData) => {
  try {
    const formData = new FormData();

    // Agregar todos los campos al FormData, incluyendo el archivo (logo).
    for (const key in updatedData) {
      if (updatedData[key] !== null) {
        formData.append(key, updatedData[key]);
      }
    }

    const response = await Axios.put(
      `/api/restaurants/${restaurantId}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Especificar que se envían archivos.
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al actualizar el restaurante:", error);
    throw error;
  }
};

/**
 * Elimina un restaurante existente por su ID.
 *
 * @param {string} restaurantId - ID del restaurante a eliminar.
 * @returns {Promise<Object>} Respuesta de eliminación.
 * @throws {Error} Si ocurre un error al realizar la solicitud.
 */
export const deleteRestaurant = async (restaurantId) => {
  try {
    const response = await Axios.delete(`/api/restaurants/${restaurantId}/`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el restaurante:", error);
    throw error;
  }
};
