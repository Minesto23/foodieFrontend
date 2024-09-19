import { useContext, useCallback } from 'react';
import { MainContext } from '../context/MainContext';
import {
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getCategoryById, // Import the new function to fetch a category by ID
} from '../api/controllers/MenuItems';

export const useMenuItems = () => {
  const { menuItems, setMenuItems, loading, setLoading } =
    useContext(MainContext);

  const fetchAllMenuItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllMenuItems();

      // Fetch the category name for each menu item
      const menuItemsWithCategoryNames = await Promise.all(
        data.map(async menuItem => {
          const category = await getCategoryById(menuItem.category);
          return { ...menuItem, categoryName: category.name };
        })
      );

      setMenuItems(menuItemsWithCategoryNames);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setMenuItems]);

  const addMenuItem = useCallback(
    async newItem => {
      try {
        const data = await createMenuItem(newItem);
        setMenuItems(prevItems => [...prevItems, data]);
      } catch (error) {
        console.error('Error creating menu item:', error);
      }
    },
    [setMenuItems]
  );

  const modifyMenuItem = useCallback(
    async (id, updatedData) => {
      try {
        const data = await updateMenuItem(id, updatedData);
        setMenuItems(prevItems =>
          prevItems.map(item => (item.id === id ? data : item))
        );
      } catch (error) {
        console.error('Error updating menu item:', error);
      }
    },
    [setMenuItems]
  );

  const removeMenuItem = useCallback(
    async id => {
      try {
        await deleteMenuItem(id);
        setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting menu item:', error);
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

export default useMenuItems;
