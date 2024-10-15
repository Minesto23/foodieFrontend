import { useState, useCallback } from "react";
// import { MainContext } from "../context/MainContext";
import {
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../api/controllers/MenuItems";
import { getCategoryById } from "../api/controllers/Categories"; // Import from Categories controller

export const UseMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllMenuItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllMenuItems();

      // Fetch the category name for each menu item
      const menuItemsWithCategoryNames = await Promise.all(
        data.map(async (menuItem) => {
          const category = await getCategoryById(menuItem.category); // Fetch category by ID
          return { ...menuItem, categoryName: category.name };
        })
      );

      setMenuItems(menuItemsWithCategoryNames);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setMenuItems]);

  const [addingItem, setAddingItem] = useState(false);

  const addMenuItem = useCallback(
    async (newItem) => {
      if (addingItem) return; // Prevent multiple calls
  
      setAddingItem(true); // Set adding in progress
      try {
        const data = await createMenuItem(newItem);
        setMenuItems((prevItems) => [...prevItems, data]);
      } catch (error) {
        console.error("Error creating menu item:", error);
      } finally {
        setAddingItem(false); // Reset adding state
      }
    },
    [setMenuItems, addingItem]
  );

  const modifyMenuItem = useCallback(
    async (id, updatedData) => {
      try {
        const data = await updateMenuItem(id, updatedData);
        setMenuItems((prevItems) =>
          prevItems.map((item) => (item.id === id ? data : item))
        );
      } catch (error) {
        console.error("Error updating menu item:", error);
      }
    },
    [setMenuItems]
  );

  const removeMenuItem = useCallback(
    async (id) => {
      try {
        await deleteMenuItem(id);
        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting menu item:", error);
      }
    },
    [setMenuItems]
  );

  return {
    menuItems,
    loading,
    fetchAllMenuItems,
    addMenuItem,
    modifyMenuItem,
    removeMenuItem,
  };
};

export default UseMenuItems;
