import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/controllers/Categories";
import toast from "react-hot-toast";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Fetch categories for a specific restaurant
  const fetchCategories = useCallback(async (restaurantId) => {
    if (!restaurantId) return;
    setLoading(true);
    setError(null);
    try {
      const filteredCategories = await getAllCategories({ restaurantId }); // Supongamos que la API acepta un filtro
      setCategories(filteredCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Error fetching categories");
      toast.error("Error al cargar las categorías.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new category
  const addCategory = async (newCategory, callback) => {
    setError(null);
    try {
      const data = await createCategory(newCategory);
      setCategories((prev) => [...prev, data]);
      toast.success("Categoría creada con éxito.");
      if (callback) callback(data);
    } catch (err) {
      console.error("Error creating category:", err);
      setError("Error creating category");
      toast.error("Error al crear la categoría.");
    }
  };

  // Edit an existing category
  const editCategory = async (id, updatedData, callback) => {
    setError(null);
    try {
      const data = await updateCategory(id, updatedData);
      setCategories((prev) =>
        prev.map((category) =>
          category.id === id ? { ...category, ...data } : category
        )
      );
      toast.success("Categoría actualizada con éxito.");
      if (callback) callback(data);
    } catch (err) {
      console.error("Error updating category:", err);
      setError("Error updating category");
      toast.error("Error al actualizar la categoría.");
    }
  };

  // Remove a category
  const removeCategory = async (id, callback) => {
    setError(null);
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
      toast.success("Categoría eliminada con éxito.");
      if (callback) callback();
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Error deleting category");
      toast.error("Error al eliminar la categoría.");
    }
  };

  // Automatically fetch categories when the modal closes
  useEffect(() => {
    if (!isCategoryModalOpen && categories.length > 0) {
      const restaurantId = categories[0].restaurant;
      if (restaurantId) fetchCategories(restaurantId);
    }
  }, [isCategoryModalOpen, fetchCategories, setIsCategoryModalOpen]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        fetchCategories,
        addCategory,
        editCategory,
        removeCategory,
        isCategoryModalOpen,
        setIsCategoryModalOpen,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
