import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Flex,
  useColorMode,
  Text,
  IconButton,
  useDisclosure, // Import useDisclosure to manage modal state
} from "@chakra-ui/react";
import MenuBar from "../../components/MenuBar";
import RestaurantName from "../../components/RestaurantName";
import FoodCard from "../../components/FoodCard";
import EmptyFood from "../../components/EmptyFood";
import FoodItemModal from "../../components/FoodItemModal";
import RestaurantModal from "../../components/RestaurantModal";
import CategoryModal from "../../components/CategoryModal";
import HelpModal from "../../components/HelpModal"; // Import HelpModal
import { MdEdit } from "react-icons/md";
import {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../api/controllers/MenuItems";
import toast from "react-hot-toast"; // Importación de toast para feedback de usuario
// customized hook
import { UseCategories } from "../../hooks/UseMenuCategories";

const MainPage = ({ selectedRestaurant }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // Modal disclosure for FoodItemModal
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  // Modal disclosure for HelpModal
  const {
    isOpen: isHelpModalOpen,
    onOpen: onHelpModalOpen,
    onClose: onHelpModalClose,
  } = useDisclosure();

  // const { categories, fetchAllCategories } = UseCategories();
  const { menuCategories: categories, fetchAllCategories } =
    UseCategories(selectedRestaurant);
  const [menuItems, setMenuItems] = useState([]); // State to manage menu items from API
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for editing
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Selected category for filtering
  // const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const openCategoryModal = () => setIsCategoryModalOpen(!isCategoryModalOpen);
  // const closeCategoryModal = () => setIsCategoryModalOpen(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false);

  useEffect(() => {
    if (!selectedRestaurant) {
      setRestaurantDetails({ name: "Select a restaurant" });
      return;
    }

    setRestaurantDetails(selectedRestaurant);
    fetchAllCategories(); // Fetch categories when a restaurant is selected
  }, [selectedRestaurant, fetchAllCategories, isCategoryModalOpen]);

  // Use another useEffect to log categories after they are updated
  useEffect(() => {
    console.log(categories); // This will now log categories whenever they are updated
  }, [categories]);

  // Add or update food item via API with toast notification
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
        toast.success("¡Elemento de comida actualizado con éxito!");
      } else {
        // Add new item via API
        const createdItem = await createMenuItem(newItem);
        setMenuItems((prevItems) => [...prevItems, createdItem]);
        toast.success("¡Elemento de comida creado con éxito!");
      }
      closeModal();
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
      await deleteMenuItem(id);
      setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
      toast.success("¡Elemento de comida eliminado con éxito!");
      closeModal();
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

  const handleAddItem = () => {
    setSelectedItem(null); // Reset selected item for add mode
    openModal(); // Open the modal
  };

  const handleEditItem = (item) => {
    setSelectedItem(item); // Set the selected item for editing
    openModal(); // Open the modal
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
        categories={categories || []} // Default to an empty array if categories is undefined
        selectedCategoryId={selectedCategoryId} // Pass selected category ID
        onCategorySelect={handleCategorySelect} // Pass category selection handler
        selectedRestaurant={selectedRestaurant} // Pass selectedRestaurant
        IsCategoryModalOpen={isCategoryModalOpen}
        openCategoryModal={openCategoryModal}
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
      )}

      <FoodItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
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

      {/* <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
        initialData={selectedCategory}
        selectedRestaurant={restaurantDetails}
      /> */}

      {/* Help Modal */}
      <HelpModal isOpen={isHelpModalOpen} onClose={onHelpModalClose} />
    </Box>
  );
};

export default MainPage;
