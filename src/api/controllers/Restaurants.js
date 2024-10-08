import Axios from "../Axios";

// Obtener todos los restaurantes filtrados por usuario
export const getAllRestaurants = async () => {
  try {
    const response = await Axios.get("/api/restaurants/");
    console.log(response,'controller');
    
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

// Crear un nuevo restaurante
export const createRestaurant = async (restaurantData) => {
  try {
    const formData = new FormData();

    // Agregar todos los campos al FormData, incluyendo el archivo (logo)
    for (const key in restaurantData) {
      if (restaurantData[key] !== null) {
        formData.append(key, restaurantData[key]);
      }
    }
    const response = await Axios.post("/api/restaurants/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw error;
  }
};

// Obtener un solo restaurante por ID
export const getRestaurantById = async (restaurantId) => {
  try {
    const response = await Axios.get(`/api/restaurants/${restaurantId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    throw error;
  }
};

// Actualizar un restaurante por ID
export const updateRestaurant = async (restaurantId, updatedData) => {
  try {
    const formData = new FormData();

    // Agregar todos los campos al FormData, incluyendo el archivo (logo)
    for (const key in updatedData) {
      if (updatedData[key] !== null) {
        formData.append(key, updatedData[key]);
      }
    }

    // Enviar la solicitud PUT con FormData
    const response = await Axios.put(
      `/api/restaurants/${restaurantId}/`,
      formData, // FormData se encarga del archivo correctamente
      {
        headers: {
          "Content-Type": "multipart/form-data", // Especificar multipart para enviar archivos
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error actualizando el restaurante:", error);
    throw error;
  }
};

// Eliminar un restaurante por ID
export const deleteRestaurant = async (restaurantId) => {
  try {
    const response = await Axios.delete(`/api/restaurants/${restaurantId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    throw error;
  }
};
