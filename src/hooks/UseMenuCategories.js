import { useCallback, useState } from "react";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../api/controllers/Categories";

import axios from "../api/Axios";

// // Renamed the hook to follow consistent naming
// export const UseCategories = (selectedRestaurant) => {
//   const [menuCategories, setMenuCategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchAllCategories = useCallback(async () => {
//     // Safeguard check to ensure selectedRestaurant exists
//     // if (!selectedRestaurant?.id) return; // Ensure selectedRestaurant and id are valid before proceeding

//     setLoading(true);
//     try {
//       const data = await getAllCategories();
//       // Filter categories based on the selected restaurant
//       const filteredCategories = data.filter(
//         (category) => category.restaurant === selectedRestaurant.id
//       );
//       setMenuCategories(filteredCategories);
//       console.log(data, "categorias");
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []); // Safeguard by using optional chaining

//   const addCategory = useCallback(
//     async (newCategory) => {
//       try {
//         const data = await createCategory(newCategory);
//         setMenuCategories((prevCategories) => [...prevCategories, data]);
//       } catch (error) {
//         console.error("Error creating category:", error);
//       }
//     },
//     [setMenuCategories]
//   );

//   const modifyCategory = async (id, updatedData) => {
//     try {
//       const response = await axios.put(
//         `api/menu-categories/${id}/`,
//         updatedData
//       );
//       setMenuCategories((prevCategories) =>
//         prevCategories.map((category) =>
//           category.id === id ? response.data : category
//         )
//       );
//       return response.data;
//     } catch (error) {
//       console.error(
//         "Error updating category:",
//         error.response ? error.response.data : error.message
//       );
//       throw error;
//     }
//   };

//   const removeCategory = useCallback(
//     async (id) => {
//       try {
//         await deleteCategory(id);
//         setMenuCategories((prevCategories) =>
//           prevCategories.filter((category) => category.id !== id)
//         );
//       } catch (error) {
//         console.error("Error deleting category:", error);
//       }
//     },
//     [setMenuCategories]
//   );

//   return {
//     menuCategories,
//     loading,
//     fetchAllCategories,
//     addCategory,
//     modifyCategory,
//     removeCategory,
//   };
// };

// export default UseCategories;

export const UseCategories = (selectedRestaurant) => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllCategories = useCallback(async () => {
    if (!selectedRestaurant?.id) return; // Ensure selectedRestaurant and id are valid before proceeding

    setLoading(true);
    try {
      const data = await getAllCategories();
      // Filter categories based on the selected restaurant
      const filteredCategories = data.filter(
        (category) => category.restaurant === selectedRestaurant.id
      );
      setMenuCategories(filteredCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedRestaurant]); // Add selectedRestaurant as a dependency

  return {
    menuCategories,
    loading,
    fetchAllCategories,
  };
};
