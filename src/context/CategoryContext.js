import React, { createContext, useContext, useState, useCallback } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/controllers/Categories";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async (restaurantId) => {
    if (!restaurantId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCategories();
      const filteredCategories = data.filter(
        (category) => category.restaurant === restaurantId
      );
      setCategories(filteredCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Error fetching categories");
    } finally {
      setLoading(false);
    }
  }, []);

  const addCategory = async (newCategory) => {
    setError(null);
    try {
      const data = await createCategory(newCategory);
      setCategories((prev) => [...prev, data]);
    } catch (err) {
      console.error("Error creating category:", err);
      setError("Error creating category");
    }
  };

  const editCategory = async (id, updatedData) => {
    setError(null);
    try {
      const data = await updateCategory(id, updatedData);
      setCategories((prev) =>
        prev.map((category) =>
          category.id === id ? { ...category, ...data } : category
        )
      );
    } catch (err) {
      console.error("Error updating category:", err);
      setError("Error updating category");
    }
  };

  const removeCategory = async (id) => {
    setError(null);
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Error deleting category");
    }
  };

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
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
