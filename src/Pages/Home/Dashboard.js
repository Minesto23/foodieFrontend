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
import FoodItemModal from "../../components/FoodItemModal";
import RestaurantModal from "../../components/RestaurantModal";
import HelpModal from "../../components/HelpModal";
import CategoryModal from "../../components/CategoryModal";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { useRestaurantContext } from "../../context/RestaurantContext";
import { UseCategories } from "../../hooks/UseMenuCategories";
import UseMenuItems from "../../hooks/UseMenuItems";

const MainPage = ({ selectedRestaurant, setSelectedRestaurant }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { restaurants } = useRestaurantContext();

  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    isOpen: isHelpModalOpen,
    onClose: onHelpModalClose,
    onOpen: onHelpModalOpen,
  } = useDisclosure();
  const { menuCategories: categories = [], fetchAllCategories } =
    UseCategories(restaurantDetails);
  const {
    menuItems = [],
    fetchAllMenuItems,
    addMenuItem,
    modifyMenuItem,
    removeMenuItem,
  } = UseMenuItems();

  // Fetch initial data and manage restaurant details
  useEffect(() => {
    if (!restaurants || restaurants.length === 0) {
      onHelpModalOpen();
      toast("No restaurants found. Please add a restaurant.", {
        status: "info",
      });
    } else {
      onHelpModalClose();
    }

    if (selectedRestaurant) {
      setRestaurantDetails(selectedRestaurant);
    } else {
      setRestaurantDetails(restaurants[0] || { name: "Select a restaurant" });
    }

    fetchAllCategories();
    fetchAllMenuItems();
  }, [
    selectedRestaurant,
    fetchAllCategories,
    fetchAllMenuItems,
    restaurants,
    onHelpModalClose,
    onHelpModalOpen,
  ]);

  useEffect(() => {
    if (!isCategoryModalOpen) {
      fetchAllMenuItems();
    }
  }, [isCategoryModalOpen, fetchAllMenuItems]);

  // Add or modify food items
  const handleNewFoodItem = async (newItem) => {
    try {
      if (selectedItem) {
        await modifyMenuItem(selectedItem.id, newItem);
        toast.success("Food item updated successfully!");
      } else {
        await addMenuItem(newItem);
        toast.success("Food item added successfully!");
      }
      fetchAllMenuItems();
    } catch (error) {
      toast.error("Error saving food item. Please try again.");
    }
  };

  // Delete food items
  const handleDeleteItem = async (id) => {
    try {
      await removeMenuItem(id);
      toast.success("Food item deleted successfully!");
      fetchAllMenuItems();
    } catch (error) {
      toast.error("Error deleting food item. Please try again.");
    }
  };

  // Filter items based on selected category
  const filteredFoodItems = selectedCategoryId
    ? menuItems.filter((item) => item.category === selectedCategoryId)
    : menuItems;

  // Category selection handler
  const handleCategorySelect = (categoryId) =>
    setSelectedCategoryId(categoryId);

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleUpdateRestaurant = (updatedRestaurant) => {
    setSelectedRestaurant(updatedRestaurant);
    setRestaurantDetails(updatedRestaurant);
    setRestaurantModalOpen(false);
    toast.success("Restaurant updated successfully!");
  };

  return (
    <Box
      bg={isDark ? "gray.800" : "gray.50"}
      color={isDark ? "gray.200" : "gray.900"}
      minH="100vh"
      p={6}
    >
      <RestaurantName
        name={restaurantDetails?.name || "Select a restaurant"}
        onEdit={() => setRestaurantModalOpen(true)}
      />

      <MenuBar
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleCategorySelect}
        selectedRestaurant={restaurantDetails}
        openCategoryModal={() => setIsCategoryModalOpen(true)}
        client={false}
        fetchAllCategories={fetchAllCategories}
      />

      {/* Categories and Food Items */}
      {categories
        .filter(
          (category) =>
            !selectedCategoryId || category.id === selectedCategoryId
        )
        .map((category) => (
          <Box key={category.id} mt={8}>
            <Flex justifyContent="center" alignItems="center">
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                mb={4}
              >
                {category.name}
              </Text>
              <IconButton
                aria-label="Edit Category"
                icon={<MdEdit />}
                size={{ base: "md", md: "lg" }}
                variant="ghost"
                pb={4}
                onClick={() => handleEditCategory(category)}
              />
            </Flex>

            {filteredFoodItems.some((item) => item.category === category.id) ? (
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing={4}
              >
                {filteredFoodItems
                  .filter((item) => item.category === category.id)
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
            ) : (
              <Text textAlign="center" fontSize="md" color="gray.500">
                No items in this category.
              </Text>
            )}
          </Box>
        ))}

      {/* Add New Item Button */}
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
          Add Item
        </Text>
      </Box>

      {/* Modals */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        initialData={selectedCategory}
        selectedRestaurant={restaurantDetails}
        onCategoryCreated={fetchAllCategories}
      />

      <FoodItemModal
        isOpen={isItemModalOpen}
        onClose={() => {
          setIsItemModalOpen(false);
          fetchAllMenuItems();
        }}
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
