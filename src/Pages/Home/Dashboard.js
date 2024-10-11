import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Flex,
  useColorMode,
  Text,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import MenuBar from "../../components/MenuBar";
import RestaurantName from "../../components/RestaurantName";
import FoodCard from "../../components/FoodCard";
import EmptyFood from "../../components/EmptyFood";
import FoodItemModal from "../../components/FoodItemModal";
import RestaurantModal from "../../components/RestaurantModal";
import HelpModal from "../../components/HelpModal";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast"; // For user feedback

// Customized hooks
import { UseCategories } from "../../hooks/UseMenuCategories";
import UseMenuItems from "../../hooks/UseMenuItems";

const MainPage = ({ selectedRestaurant }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // Modal disclosure for HelpModal
  const { isOpen: isHelpModalOpen, onClose: onHelpModalClose } =
    useDisclosure();

  // Use hooks for menu categories and items
  const { menuCategories: categories, fetchAllCategories } =
    UseCategories(selectedRestaurant);
  const {
    menuItems,
    fetchAllMenuItems,
    addMenuItem,
    modifyMenuItem,
    removeMenuItem,
  } = UseMenuItems();

  // State management
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for editing
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Selected category for filtering
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (!selectedRestaurant) {
      setRestaurantDetails({ name: "Select a restaurant" });
      return;
    }

    setRestaurantDetails(selectedRestaurant);
    fetchAllCategories(); // Fetch categories when a restaurant is selected
    fetchAllMenuItems(); // Fetch menu items
  }, [
    selectedRestaurant,
    fetchAllCategories,
    fetchAllMenuItems,
    isCategoryModalOpen,
    isItemModalOpen,
  ]);

  // Add or update food item via API with toast notification
  const handleNewFoodItem = async (newItem) => {
    try {
      if (selectedItem) {
        // Update existing item via API
        await modifyMenuItem(selectedItem.id, newItem);
        toast.success("¡Elemento de comida actualizado con éxito!");
      } else {
        // Add new item via API
        await addMenuItem(newItem);
        toast.success("¡Elemento de comida creado con éxito!");
      }
    } catch (error) {
      console.error("Error al guardar el elemento de comida:", error);
      toast.error(
        "Error al guardar el elemento de comida. Inténtelo de nuevo."
      );
    }
  };

  // Handle item deletion via API with toast notification
  const handleDeleteItem = async (id) => {
    try {
      await removeMenuItem(id);
      toast.success("¡Elemento de comida eliminado con éxito!");
    } catch (error) {
      console.error("Error al eliminar el elemento de comida:", error);
      toast.error(
        "Error al eliminar el elemento de comida. Inténtelo de nuevo."
      );
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
    setIsCategoryModalOpen(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item); // Set the selected item for editing
    setIsItemModalOpen(true); // Open the modal
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
        onEdit={() => setRestaurantModalOpen(true)}
      />

      {/* Menu Bar */}
      <MenuBar
        categories={categories || []}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleCategorySelect}
        selectedRestaurant={selectedRestaurant}
        openCategoryModal={() => setIsCategoryModalOpen(true)}
      />

      {/* Conditional rendering of FoodCards or EmptyFood */}
      {filteredFoodItems?.length > 0 ? (
        categories?.map((category) => (
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
                      ?.filter((item) => item.category === category.id)
                      .map((item) => (
                        <FoodCard
                          key={item.id}
                          imageUrl={item.image_url}
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

      {/* Add Item Card, visible only if there is at least one category */}
      {categories?.length > 0 && (
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
          onClick={() => setIsItemModalOpen(true)}
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
      )}

      <FoodItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        onSubmit={handleNewFoodItem}
        onDelete={handleDeleteItem}
        initialData={selectedItem}
        categories={categories}
      />

      <RestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={() => setRestaurantModalOpen(false)}
        onSubmit={handleUpdateRestaurant}
        initialData={restaurantDetails}
      />

      <HelpModal isOpen={isHelpModalOpen} onClose={onHelpModalClose} />
    </Box>
  );
};

export default MainPage;
