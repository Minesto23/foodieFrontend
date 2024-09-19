import { useContext, useCallback } from "react";
import { MainContext } from "../context/MainContext";
import {
  getAllCategories,
  createCategory,
  // updateCategory,
  deleteCategory,
} from "../api/controllers/Categories";

import axios from "../api/Axios";

export const useCategories = () => {
  const { menuCategories, setMenuCategories, loading, setLoading } =
    useContext(MainContext);

  const fetchAllCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      setMenuCategories(data);
      console.log(data, "categorias");
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setMenuCategories]);

  const addCategory = useCallback(
    async (newCategory) => {
      try {
        const data = await createCategory(newCategory);
        setMenuCategories((prevCategories) => [...prevCategories, data]);
      } catch (error) {
        console.error("Error creating category:", error);
      }
    },
    [setMenuCategories]
  );

  const modifyCategory = async (id, updatedData) => {
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
    } catch (error) {
      console.error(
        "Error updating category:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const removeCategory = useCallback(
    async (id) => {
      try {
        await deleteCategory(id);
        setMenuCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    },
    [setMenuCategories]
  );

  return {
    menuCategories,
    loading,
    fetchAllCategories,
    addCategory,
    modifyCategory,
    removeCategory,
  };
};

export default useCategories;
