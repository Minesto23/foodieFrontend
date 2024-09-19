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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (selectedRestaurant) {
      setRestaurantDetails(selectedRestaurant);
    }

    fetchCategories();
  }, [selectedRestaurant]);

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const itemsData = await getAllMenuItems();
        setMenuItems(itemsData);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

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
                          key={item.id}
                          imageUrl={item.imageUrl}
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

      {/* Food Item Modal */}
      <FoodItemModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleNewFoodItem}
        onDelete={handleDeleteItem}
        initialData={selectedItem}
        categories={categories} // Pass the list of categories
      />

      {/* Modals for editing restaurant */}
      <RestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={() => setRestaurantModalOpen(false)}
        onSubmit={handleUpdateRestaurant}
        initialData={restaurantDetails}
      />

      {/* Category Edit Modal */}
      <CategoryModal
        isOpen={isCategoryOpen}
        onClose={() => setCategoryOpen(false)}
        onSubmit={handleAddOrUpdateCategory}
        onDelete={handleDeleteCategory}
        initialData={selectedCategory}
      />
    </Box>
  );
};

export default MainPage;
