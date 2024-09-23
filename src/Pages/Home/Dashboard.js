import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Flex,
  useColorMode,
  Text,
  IconButton,
} from "@chakra-ui/react";
import MenuBar from "../../components/MenuBar";
import RestaurantName from "../../components/RestaurantName";
import FoodCard from "../../components/FoodCard";
import EmptyFood from "../../components/EmptyFood";
import FoodItemModal from "../../components/FoodItemModal";
// import UpdateDeleteRestaurantModal from "../../components/RestaurantModalUpdateDelete";
import RestaurantModal from "../../components/RestaurantModal";
import CategoryModal from "../../components/CategoryModal";
import { MdEdit } from "react-icons/md";
import { getAllCategories } from "../../api/controllers/Categories";
import {
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../api/controllers/MenuItems";
import { deleteRestaurant } from "../../api/controllers/Restaurants";
import toast from "react-hot-toast";

const MainPage = ({ selectedRestaurant }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for editing
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Selected category for filtering

  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]); // State to manage menu items from API

  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]); // Estado para manejar la lista de restaurantes

  useEffect(() => {
    // Fetch categories and filter by selectedRestaurant
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllCategories();
        // Filter categories based on the selected restaurant
        const filteredCategories = categoryData.filter(
          (category) => category.restaurant === selectedRestaurant.id
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (selectedRestaurant) {
      setRestaurantDetails(selectedRestaurant);
      fetchCategories(); // Fetch categories when a restaurant is selected
    }
  }, [selectedRestaurant]);

  // Fetch menu items from API and filter by categories of the selected restaurant
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const itemsData = await getAllMenuItems();
        // Get the category IDs of the filtered categories
        const categoryIds = categories.map((category) => category.id);
        // Filter menu items based on the categories of the selected restaurant
        const filteredMenuItems = itemsData.filter((item) =>
          categoryIds.includes(item.category)
        );
        setMenuItems(filteredMenuItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    if (selectedRestaurant && categories.length > 0) {
      fetchMenuItems(); // Fetch items when a restaurant and its categories are available
    }
  }, [selectedRestaurant, categories]);

  // Add or update food item via API
  const handleNewFoodItem = async (newItem) => {
    try {
      if (selectedItem) {
        // Update existing item via API
        const updatedItem = await updateMenuItem(selectedItem.id, newItem);
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item.id === selectedItem.id ? updatedItem : item
          )
        );
      } else {
        // Add new item via API
        const createdItem = await createMenuItem(newItem);
        setMenuItems((prevItems) => [...prevItems, createdItem]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving food item:", error);
    }
  };

  // Handle item deletion via API
  const handleDeleteItem = async (id) => {
    try {
      await deleteMenuItem(id);
      setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setModalOpen(false);
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  // Function to filter items by selected category
  const filteredFoodItems = selectedCategoryId
    ? menuItems.filter((item) => item.category === selectedCategoryId)
    : menuItems;

  // Function to handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setCategoryOpen(true);
  };

  const handleAddOrUpdateCategory = (newCategory) => {
    console.log("Add or Update Category:", newCategory);
    setCategoryOpen(false);
  };

  const handleDeleteCategory = (categoryId) => {
    console.log("Delete Category ID:", categoryId);
    setCategoryOpen(false);
  };

  const handleEditRestaurant = () => {
    setRestaurantModalOpen(true); // Open the restaurant modal
  };
  const handleEditItem = (item) => {
    setSelectedItem(item); // Set the selected item for editing
    setModalOpen(true); // Open the modal
  };
  const handleAddItem = () => {
    setSelectedItem(null); // Reset selected item for add mode
    setModalOpen(true); // Open the modal
  };
  const handleUpdateRestaurant = (updatedRestaurant) => {
    setRestaurantDetails(updatedRestaurant); // Update restaurant state
    setRestaurantModalOpen(false); // Close the modal
  };

  const refreshData = async () => {
    // Refetch categories and menu items after modal actions
    const categoryData = await getAllCategories();
    const filteredCategories = categoryData.filter(
      (category) => category.restaurant === selectedRestaurant.id
    );
    setCategories(filteredCategories);

    const itemsData = await getAllMenuItems();
    const categoryIds = filteredCategories.map((category) => category.id);
    const filteredMenuItems = itemsData.filter((item) =>
      categoryIds.includes(item.category)
    );
    setMenuItems(filteredMenuItems);
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      await deleteRestaurant(restaurantId); // Llamada a la API para eliminar el restaurante
      // Actualiza el estado de los restaurantes después de eliminarlo
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant.id !== restaurantId)
      );
      setRestaurantModalOpen(false); // Cerrar el modal después de la eliminación
      toast.success("Restaurant deleted successfully!"); // Mostrar notificación de éxito
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      toast.error("Failed to delete restaurant. Please try again."); // Notificación de error
    }
  };

  return (
    <Box
      bg={isDark ? "gray.800" : "gray.50"}
      color={isDark ? "gray.200" : "gray.900"}
      minH="100vh"
      p={6}
    >
      {/* Restaurant Name with edit functionality */}
      <RestaurantName
        name={restaurantDetails?.name || "Select a restaurant"}
        onEdit={handleEditRestaurant}
      />

      {/* Menu Bar */}
      <MenuBar
        categories={categories}
        selectedCategoryId={selectedCategoryId} // Pass selected category ID
        onCategorySelect={handleCategorySelect} // Pass category selection handler
        selectedRestaurant={selectedRestaurant} // Pass selectedRestaurant
      />

      {/* Conditional rendering of FoodCards or EmptyFood */}
      {filteredFoodItems.length > 0 ? (
        categories.map((category) => (
          <Box key={category.id} mt={8}>
            {filteredFoodItems.some(
              (item) => item.category === category.id
            ) && (
              <>
                <Flex justifyContent="center" alignItems="center">
                  <Text fontSize="2xl" fontWeight="bold" mb={4}>
                    {category.name}
                  </Text>
                  <IconButton
                    aria-label="Edit Category"
                    icon={<MdEdit />}
                    size="lg"
                    variant="ghost"
                    pb={4}
                    onClick={() => handleEditCategory(category)}
                  />
                </Flex>

                {/* Grid of food items for the category */}
                <Flex justifyContent="center">
                  <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={4}>
                    {filteredFoodItems
                      .filter((item) => item.category === category.id)
                      .map((item) => (
                        <FoodCard
                          key={item.id} // Add a unique key prop here
                          imageUrl={item.image_url}
                          // imageUrl="https://i.imgur.com/qF77EgD.jpeg"
                          category={item.name}
                          description={item.description}
                          price={item.price}
                          onClick={() => handleEditItem(item)}
                        />
                      ))}
                  </SimpleGrid>
                </Flex>
              </>
            )}
          </Box>
        ))
      ) : (
        <EmptyFood />
      )}

      {/* Add Item Card */}
      <Box
        bg="white"
        boxShadow="md"
        borderRadius="lg"
        p={4}
        textAlign="center"
        maxW="200px"
        _hover={{
          boxShadow: "lg",
          transform: "scale(1.05)",
          transition: "0.3s",
        }}
        cursor="pointer"
        onClick={handleAddItem}
        mt={8}
        mx="auto"
      >
        <Box
          bg="gray.200"
          borderRadius="full"
          width="80px"
          height="80px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          mb={4}
        >
          <Text fontSize="4xl" color="gray.600">
            +
          </Text>
        </Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700">
          Agregar Item
        </Text>
      </Box>

      {/* Food Item Modal
      <FoodItemModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleNewFoodItem}
        onDelete={handleDeleteItem}
        initialData={selectedItem}
        categories={categories} // Pass the list of categories
      />

      {/* Modals for updating or deleting a restaurant */}
      {/* <UpdateDeleteRestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={() => setRestaurantModalOpen(false)}
        initialData={restaurantDetails} // Pass the restaurant details for editing
        onSubmit={handleUpdateRestaurant} // Pass the function to update the restaurant
        onDelete={handleDeleteRestaurant} // Pass the function to delete the restaurant
      /> */}
      {/* Modals for editing restaurant */}
      {/* <RestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={() => setRestaurantModalOpen(false)}
        onSubmit={handleUpdateRestaurant}
        initialData={restaurantDetails}
      />

      {/* Category Edit Modal */}
      {/* <CategoryModal
        isOpen={isCategoryOpen}
        onClose={() => setCategoryOpen(false)}
        onSubmit={handleAddOrUpdateCategory}
        onDelete={handleDeleteCategory}
        initialData={selectedCategory}
        selectedRestaurant={restaurantDetails} // Pass the selectedRestaurant here
      /> */}
      <FoodItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          refreshData(); // Refrescar datos sin recargar la página completa
        }}
        onSubmit={handleNewFoodItem}
        onDelete={handleDeleteItem}
        initialData={selectedItem}
        categories={categories}
      />

      <RestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={() => {
          setRestaurantModalOpen(false);
          refreshData(); // Refrescar datos
        }}
        onSubmit={handleUpdateRestaurant}
        initialData={restaurantDetails}
      />

      <CategoryModal
        isOpen={isCategoryOpen}
        onClose={() => {
          setCategoryOpen(false);
          refreshData(); // Refrescar datos
        }}
        onSubmit={handleAddOrUpdateCategory}
        onDelete={handleDeleteCategory}
        initialData={selectedCategory}
        selectedRestaurant={restaurantDetails}
      />
    </Box>
  );
};

export default MainPage;
