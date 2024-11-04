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
import FoodCard from "../../components/FoodCard";
import EmptyFood from "../../components/EmptyFood";
import FoodItemModal from "../../components/FoodItemModal";
import RestaurantModal from "../../components/RestaurantModal";
import HelpModal from "../../components/HelpModal";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import RestaurantHeader from "../../components/HeaderClient";

// Customized hooks
import { UseCategories } from "../../hooks/UseMenuCategories";
import UseMenuItems from "../../hooks/UseMenuItems";

// Controller
import { getRestaurantById } from "../../api/controllers/Restaurants";

const MainPage = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { id } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isOpen: isHelpModalOpen, onClose: onHelpModalClose } =
    useDisclosure();

  const { menuCategories: categories, fetchAllCategories } =
    UseCategories(restaurantDetails);
  const {
    menuItems,
    fetchAllMenuItems,
    addMenuItem,
    modifyMenuItem,
    removeMenuItem,
  } = UseMenuItems();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await getRestaurantById(id);
          setRestaurantDetails(data);
        } catch (error) {
          console.error("Error fetching restaurant details:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setRestaurantDetails({ name: "Select a restaurant" });
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  useEffect(() => {
    if (restaurantDetails) {
      fetchAllCategories();
      fetchAllMenuItems();
    }
  }, [
    restaurantDetails,
    fetchAllCategories,
    fetchAllMenuItems,
    isCategoryModalOpen,
    isItemModalOpen,
  ]);

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

  const filteredFoodItems = selectedCategoryId
    ? menuItems.filter((item) => item.category === selectedCategoryId)
    : menuItems;

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <Box
      bg={isDark ? "gray.800" : "gray.50"}
      color={isDark ? "gray.200" : "gray.900"}
      minH="100vh"
      p={6}
    >
      <RestaurantHeader
        name={restaurantDetails?.name || "Nombre no disponible"}
        logo={restaurantDetails?.logo_url || ""}
        opening_hour={
          restaurantDetails?.opening_hours || "Horario no disponible"
        }
        location={restaurantDetails?.location || "Ubicación no disponible"}
      />

      {/* Menu Bar */}
      <MenuBar
        categories={categories || []}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleCategorySelect}
        selectedRestaurant={restaurantDetails}
        openCategoryModal={() => setIsCategoryModalOpen(true)}
        client={true}
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
                  <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={4}>
                    {category.name}
                  </Text>
                </Flex>

                {/* Responsive Grid of food items */}
                <Flex justifyContent="center">
                  <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={4}>
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
    </Box>
  );
};

export default MainPage;
