import Axios from "../Axios";

// Obtener todas las categorías filtradas por usuario
export const getAllCategories = async () => {
  try {
    const response = await Axios.get("/api/menu-categories/");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Crear una nueva categoría
export const createCategory = async (categoryData) => {
  try {
    const response = await Axios.post("/api/menu-categories/", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// Obtener una sola categoría por ID
export const getCategoryById = async (categoryId) => {
  try {
    const response = await Axios.get(`/api/menu-categories/${categoryId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

// Actualizar una categoría por ID
export const updateCategory = async (categoryId, updatedData) => {
  try {
    const response = await Axios.put(
      `/api/menu-categories/${categoryId}/`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// Eliminar una categoría por ID
export const deleteCategory = async (categoryId) => {
  try {
    const response = await Axios.delete(`/api/menu-categories/${categoryId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
