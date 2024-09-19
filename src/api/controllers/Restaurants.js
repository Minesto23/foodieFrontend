import Axios from "../Axios";

// Obtener todos los restaurantes filtrados por usuario
export const getAllRestaurants = async () => {
  try {
    const response = await Axios.get("/api/restaurants/");
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

// Crear un nuevo restaurante
export const createRestaurant = async (restaurantData) => {
  try {
    const response = await Axios.post("/api/restaurants/", restaurantData);
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
  console.log(updatedData, "sharingan");
  try {
    const response = await Axios.put(
      `/api/restaurants/${restaurantId}/`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating restaurant:", error);
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
