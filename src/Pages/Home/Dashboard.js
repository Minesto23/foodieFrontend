import React, { useState } from "react";
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
import FoodItemModal from "../../components/FoodItemModal"; // Import the FoodItemModal
import RestaurantModal from "../../components/RestaurantModal"; // Import the RestaurantModal
import CategoryModal from "../../components/CategoryModal"; // Import the CategoryModal
import { FaDrumstickBite, FaAppleAlt, FaFish } from "react-icons/fa";
import { RiDrinks2Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

const foodItems = [
  {
    id: 1,
    imageUrl: "https://i.imgur.com/zRgza7r.png",
    category: "Chicken",
    description: "Mixed Kebab",
    price: "15.65",
  },
  {
    id: 2,
    imageUrl: "https://i.imgur.com/0PSt4Ws.jpeg",
    category: "Fish",
    description: "Grilled Fish",
    price: "18.00",
  },
  {
    id: 3,
    imageUrl: "https://i.imgur.com/Hjq64PV.png",
    category: "Fruits",
    description: "Fruit Salad",
    price: "10.50",
  },
];

const categories = [
  { label: "Chicken", icon: FaDrumstickBite },
  { label: "Fruits", icon: FaAppleAlt },
  { label: "Fish", icon: FaFish },
  { label: "Drinks", icon: RiDrinks2Fill },
];

const MainPage = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [isModalOpen, setModalOpen] = useState(false);
  const [foodList, setFoodList] = useState(foodItems); // State to manage food items
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for editing

  const [isCategoryOpen, setCategoryOpen] = useState(false); // State to control Category modal
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category for editing

  const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false); // Restaurant modal state
  const [restaurantDetails, setRestaurantDetails] = useState({
    id: 1,
    name: "Restaurant A",
    location: "123 Main St",
    opening_hours: "9AM - 9PM",
    contact_email: "contact@restaurant.com",
    contact_phone: "123-456-7890",
    logo_url: "http://example.com/logo.png",
  });

  const handleAddItem = () => {
    setSelectedItem(null); // Reset selected item for add mode
    setModalOpen(true); // Open the modal
  };

  // Open modal for editing food item
  const handleEditItem = (item) => {
    setSelectedItem(item); // Set the selected item for editing
    setModalOpen(true); // Open the modal
  };

  // Function to handle submission of the new or edited food item
  const handleNewFoodItem = (newItem) => {
    if (selectedItem) {
      // Update the item if it's in edit mode
      const updatedFoodItems = foodList.map((item) =>
        item.id === selectedItem.id ? { ...newItem, id: selectedItem.id } : item
      );
      setFoodList(updatedFoodItems);
    } else {
      // Add a new item
      const updatedFoodItems = [
        ...foodList,
        { ...newItem, id: foodList.length + 1 },
      ];
      setFoodList(updatedFoodItems);
    }
    setModalOpen(false);
  };

  // Handle item deletion
  const handleDeleteItem = (id) => {
    const updatedFoodItems = foodList.filter((item) => item.id !== id);
    setFoodList(updatedFoodItems);
    setModalOpen(false); // Close the modal after deletion
  };

  // Handle opening the restaurant modal for editing
  const handleEditRestaurant = () => {
    setRestaurantModalOpen(true);
  };

  // Handle restaurant details update
  const handleUpdateRestaurant = (updatedRestaurant) => {
    setRestaurantDetails(updatedRestaurant); // Update restaurant state
    setRestaurantModalOpen(false); // Close the modal
  };

  // Group food items by category
  const groupedFoodItems = foodList.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {});

  // Function to open category edit modal
  const handleEditCategory = (category) => {
    setSelectedCategory(category); // Set the category for editing
    setCategoryOpen(true); // Open the category modal
  };

  // Function to handle add/update category
  const handleAddOrUpdateCategory = (newCategory) => {
    console.log("Add or Update Category:", newCategory);
    setCategoryOpen(false);
  };

  // Function to handle delete category
  const handleDeleteCategory = (categoryId) => {
    console.log("Delete Category ID:", categoryId);
    setCategoryOpen(false);
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
        name={restaurantDetails.name}
        onEdit={handleEditRestaurant}
      />

      {/* Menu Bar */}
      <MenuBar categories={categories} />

      {/* Conditional rendering of FoodCards or EmptyFood */}
      {Object.keys(groupedFoodItems).length > 0 ? (
        Object.keys(groupedFoodItems).map((category) => (
          <Box key={category} mt={8}>
            {/* Category Header */}
            <Flex justifyContent="center" alignItems="center">
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {category}
              </Text>
              <IconButton
                aria-label="Edit Category"
                icon={<MdEdit />}
                size="lg"
                variant="ghost"
                pb={4}
                onClick={() => handleEditCategory(category)} // Trigger modal for editing category
              />
            </Flex>

            {/* Grid of food items for the category */}
            <Flex justifyContent="center">
              <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={4}>
                {groupedFoodItems[category].map((item) => (
                  <FoodCard
                    key={item.id}
                    imageUrl={item.imageUrl}
                    category={item.category}
                    description={item.description}
                    price={item.price}
                    onClick={() => handleEditItem(item)} // Open modal for editing food item
                  />
                ))}
              </SimpleGrid>
            </Flex>
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
        onClick={handleAddItem} // Trigger function to add a new item
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
        onClose={() => setModalOpen(false)} // Close the modal
        onSubmit={handleNewFoodItem} // Handle the new or edited food item submission
        onDelete={handleDeleteItem} // Handle deletion of food item
        initialData={selectedItem} // Pass selected item for editing
      />

      {/* Restaurant Edit Modal */}
      <RestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={() => setRestaurantModalOpen(false)} // Close modal
        onSubmit={handleUpdateRestaurant} // Handle restaurant update
        initialData={restaurantDetails} // Pass current restaurant data
      />

      {/* Category Edit Modal */}
      <CategoryModal
        isOpen={isCategoryOpen}
        onClose={() => setCategoryOpen(false)} // Close modal
        onSubmit={handleAddOrUpdateCategory} // Function to handle add/update
        onDelete={handleDeleteCategory} // Function to handle deletion
        initialData={selectedCategory} // Pass selected category for editing
      />
    </Box>
  );
};

export default MainPage;
