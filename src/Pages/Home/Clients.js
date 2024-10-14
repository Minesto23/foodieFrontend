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
import toast from "react-hot-toast"; // For user feedback
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
  const { id } = useParams(); // Obtener el id de los parámetros de la URL
  const [restaurantDetails, setRestaurantDetails] = useState(null); // Solo un estado para los detalles del restaurante
  const [loading, setLoading] = useState(true); // Añadimos estado de carga

  // Modal disclosure for HelpModal
  const { isOpen: isHelpModalOpen, onClose: onHelpModalClose } =
    useDisclosure();

  // Use hooks for menu categories and items
  const { menuCategories: categories, fetchAllCategories } =
    UseCategories(restaurantDetails);
  const {
    menuItems,
    fetchAllMenuItems,
    addMenuItem,
    modifyMenuItem,
    removeMenuItem,
  } = UseMenuItems();

  // State management
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for editing
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Selected category for filtering
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (id) {
        try {
          setLoading(true); // Empezamos la carga
          const data = await getRestaurantById(id); // Llamada a la API para obtener los detalles del restaurante
          setRestaurantDetails(data); // Guardamos los detalles en el estado
        } catch (error) {
          console.error("Error fetching restaurant details:", error);
        } finally {
          setLoading(false); // Terminamos la carga
        }
      } else {
        setRestaurantDetails({ name: "Select a restaurant" });
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]); // Se ejecuta cada vez que el id cambia

  useEffect(() => {
    if (restaurantDetails) {
      fetchAllCategories(); // Fetch categories when a restaurant is selected
      fetchAllMenuItems(); // Fetch menu items
    }
  }, [
    restaurantDetails,
    fetchAllCategories,
    fetchAllMenuItems,
    isCategoryModalOpen,
    isItemModalOpen,
  ]);

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

  const handleEditItem = (item) => {
    setSelectedItem(item); // Set the selected item for editing
    setIsItemModalOpen(true); // Open the modal
  };

  if (loading) {
    return <Text>Cargando...</Text>; // Muestra un mensaje de carga
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
                  <Text fontSize="2xl" fontWeight="bold" mb={4}>
                    {category.name}
                  </Text>
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
    </Box>
  );
};

export default MainPage;
