import React, { createContext, useState, useEffect, useCallback } from "react";
import { getAllRestaurants } from "../api/controllers/Restaurants";
import { getAllCategories } from "../api/controllers/Categories";
import { getAllMenuItems } from "../api/controllers/MenuItems";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [restaurantsData, menuCategoriesData, menuItemsData] =
          await Promise.all([
            getAllRestaurants(),
            getAllCategories(),
            getAllMenuItems(),
          ]);

        setRestaurants(restaurantsData);
        setMenuCategories(menuCategoriesData);
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    window.localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem("user");
  }, []);

  return (
    <MainContext.Provider
      value={{
        user,
        restaurants,
        setRestaurants, // Asegúrate de que setRestaurants esté proporcionado aquí
        menuCategories,
        setMenuCategories, // Asegúrate de que setMenuCategories esté proporcionado aquí
        menuItems,
        setMenuItems, // Asegúrate de que setMenuItems esté proporcionado aquí
        loading,
        setLoading, // Asegúrate de que setLoading esté proporcionado
        login,
        logout,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
