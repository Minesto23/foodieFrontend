import { useCallback, useState } from "react";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../api/controllers/Categories";
import axios from "../api/Axios";

export const UseCategories = (selectedRestaurant) => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllCategories = useCallback(async () => {
    if (!selectedRestaurant?.id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getAllCategories();
      const filteredCategories = data.filter(
        (category) => category.restaurant === selectedRestaurant.id
      );
      setMenuCategories(filteredCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Error fetching categories");
    } finally {
      setLoading(false);
    }
  }, [selectedRestaurant]);

  const addCategory = useCallback(
    async (newCategory) => {
      setError(null);
      try {
        const data = await createCategory(newCategory);
        setMenuCategories((prevCategories) => [...prevCategories, data]);
      } catch (err) {
        console.error("Error creating category:", err);
        setError("Error creating category");
      }
    },
    [setMenuCategories]
  );

  const modifyCategory = async (id, updatedData) => {
    setError(null);
    try {
      const response = await axios.put(
        `api/menu-categories/${id}/`,
        updatedData
      );
      setMenuCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? response.data : category
        )
      );
      return response.data;
    } catch (err) {
      console.error("Error updating category:", err);
      setError("Error updating category");
      throw err;
    }
  };

  const removeCategory = useCallback(
    async (id) => {
      setError(null);
      try {
        await deleteCategory(id);
        setMenuCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
      } catch (err) {
        console.error("Error deleting category:", err);
        setError("Error deleting category");
      }
    },
    [setMenuCategories]
  );

  return {
    menuCategories,
    loading,
    error,
    fetchAllCategories,
    addCategory,
    modifyCategory,
    removeCategory,
  };
};

export default UseCategories;
