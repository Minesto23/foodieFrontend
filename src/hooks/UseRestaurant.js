import { useContext, useCallback } from "react";
import { MainContext } from "../context/MainContext";
import {
  getAllRestaurants,
  createRestaurant,
  // updateRestaurant,
  deleteRestaurant,
} from "../api/controllers/Restaurants";
import axios from "../api/Axios"; // Asumiendo que Axios está configurado para tu API

export const useRestaurants = () => {
  const { restaurants, setRestaurants, loading, setLoading } =
    useContext(MainContext);

  const fetchAllRestaurants = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setRestaurants]);

  const addRestaurant = useCallback(
    async (newRestaurant) => {
      try {
        const data = await createRestaurant(newRestaurant);
        setRestaurants((prevRestaurants) => [...prevRestaurants, data]);
      } catch (error) {
        console.error("Error creating restaurant:", error);
      }
    },
    [setRestaurants]
  );

  // const modifyRestaurant = useCallback(
  //   async (id, updatedData) => {
  //     try {
  //       const data = await updateRestaurant(id, updatedData);
  //       setRestaurants(prevRestaurants =>
  //         prevRestaurants.map(restaurant =>
  //           restaurant.id === id ? data : restaurant
  //         )
  //       );
  //     } catch (error) {
  //       console.error('Error updating restaurant:', error);
  //     }
  //   },
  //   [setRestaurants]
  // );
  const modifyRestaurant = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/restaurants/${id}/`, updatedData);
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant.id === id ? response.data : restaurant
        )
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error updating restaurant:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const removeRestaurant = useCallback(
    async (id) => {
      try {
        await deleteRestaurant(id);
        setRestaurants((prevRestaurants) =>
          prevRestaurants.filter((restaurant) => restaurant.id !== id)
        );
      } catch (error) {
        console.error("Error deleting restaurant:", error);
      }
    },
    [setRestaurants]
  );

  return {
    restaurants,
    loading,
    fetchAllRestaurants,
    addRestaurant,
    modifyRestaurant,
    removeRestaurant,
  };
};
