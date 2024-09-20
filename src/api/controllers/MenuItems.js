import Axios from "../Axios";

// Obtener todos los elementos del menú filtrados por usuario
export const getAllMenuItems = async () => {
  try {
    const response = await Axios.get("/api/menu-items/");
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

// Crear un nuevo elemento del menú
export const createMenuItem = async (menuItemData) => {
  try {
    const response = await Axios.post("/api/menu-items/", menuItemData);
    return response.data;
  } catch (error) {
    console.error("Error creating menu item:", error);
    throw error;
  }
};

// Obtener un solo elemento del menú por ID
export const getMenuItemById = async (menuItemId) => {
  try {
    const response = await Axios.get(`/api/menu-items/${menuItemId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu item:", error);
    throw error;
  }
};

// Actualizar un elemento del menú por ID
export const updateMenuItem = async (menuItemId, updatedData) => {
  try {
    const formData = new FormData();

    // Agregar todos los campos al FormData, incluyendo el archivo (logo)
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
          "Content-Type": "multipart/form-data", // Especificar multipart para enviar archivos
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

// Eliminar un elemento del menú por ID
export const deleteMenuItem = async (menuItemId) => {
  try {
    const response = await Axios.delete(`/api/menu-items/${menuItemId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};

// export const getCategoryById = async categoryId => {
//   try {
//     const response = await Axios.get(`/api/menu-categories/${categoryId}/`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching category:', error);
//     throw error;
//   }
// };
