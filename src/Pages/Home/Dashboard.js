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

/**
 * Página principal para gestionar restaurantes, categorías y elementos del menú.
 */
const MainPage = ({ selectedRestaurant, setSelectedRestaurant }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { restaurants } = useRestaurantContext();

  // Estados locales
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Hooks personalizados para manejar categorías y elementos del menú
  const { menuCategories: categories, fetchAllCategories } =
    UseCategories(restaurantDetails);
  const {
    menuItems,
    fetchAllMenuItems,
    addMenuItem,
    modifyMenuItem,
    removeMenuItem,
  } = UseMenuItems();

  // Control del modal de ayuda
  const {
    isOpen: isHelpModalOpen,
    onClose: onHelpModalClose,
    onOpen: onHelpModalOpen,
  } = useDisclosure();

  /**
   * Fetch inicial para manejar restaurantes y datos relacionados.
   */
  useEffect(() => {
    if (!restaurants || restaurants.length === 0) {
      onHelpModalOpen();
      toast("No se encontraron restaurantes. Por favor, añade uno.", {
        status: "info",
      });
    } else {
      onHelpModalClose();
    }

    if (selectedRestaurant) {
      setRestaurantDetails(selectedRestaurant);
    } else {
      setRestaurantDetails(
        restaurants[0] || { name: "Selecciona un restaurante" }
      );
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

  /**
   * Actualizar elementos del menú después de cerrar el modal de categorías.
   */
  useEffect(() => {
    if (!isCategoryModalOpen) {
      fetchAllMenuItems();
    }
  }, [isCategoryModalOpen, fetchAllMenuItems]);

  /**
   * Manejar creación o edición de elementos del menú.
   */
  const handleNewFoodItem = async (newItem) => {
    try {
      if (selectedItem) {
        await modifyMenuItem(selectedItem.id, newItem);
        toast.success("¡Elemento de comida actualizado con éxito!");
      } else {
        await addMenuItem(newItem);
        toast.success("¡Elemento de comida añadido con éxito!");
      }
      fetchAllMenuItems();
    } catch (error) {
      toast.error("Error al guardar el elemento. Inténtelo de nuevo.");
    }
  };

  /**
   * Eliminar un elemento del menú.
   */
  const handleDeleteItem = async (id) => {
    try {
      await removeMenuItem(id);
      toast.success("¡Elemento de comida eliminado con éxito!");
      fetchAllMenuItems();
    } catch (error) {
      toast.error("Error al eliminar el elemento. Inténtelo de nuevo.");
    }
  };

  /**
   * Filtrar elementos del menú por categoría seleccionada.
   */
  const filteredFoodItems = selectedCategoryId
    ? menuItems.filter((item) => item.category === selectedCategoryId)
    : menuItems;

  /**
   * Manejar selección de categorías.
   */
  const handleCategorySelect = (categoryId) =>
    setSelectedCategoryId(categoryId);

  /**
   * Manejar edición de categorías.
   */
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  /**
   * Manejar edición de elementos del menú.
   */
  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  /**
   * Manejar actualización de datos del restaurante.
   */
  const handleUpdateRestaurant = (updatedRestaurant) => {
    setSelectedRestaurant(updatedRestaurant);
    setRestaurantDetails(updatedRestaurant);
    setRestaurantModalOpen(false);
    toast.success("¡Restaurante actualizado con éxito!");
  };

  return (
    <Box
      bg={isDark ? "gray.800" : "gray.50"}
      color={isDark ? "gray.200" : "gray.900"}
      minH="100vh"
      p={6}
    >
      {/* Encabezado del restaurante */}
      <RestaurantName
        name={restaurantDetails?.name || "Selecciona un restaurante"}
        onEdit={() => setRestaurantModalOpen(true)}
      />

      {/* Barra de menú para categorías */}
      <MenuBar
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleCategorySelect}
        selectedRestaurant={restaurantDetails}
        openCategoryModal={() => setIsCategoryModalOpen(true)}
        client={false}
        fetchAllCategories={fetchAllCategories}
      />

      {/* Mostrar categorías y elementos del menú */}
      {categories.map((category) => (
        <Box key={category.id} mt={8}>
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={4}>
              {category.name}
            </Text>
            <IconButton
              aria-label="Editar categoría"
              icon={<MdEdit />}
              size="lg"
              variant="ghost"
              onClick={() => handleEditCategory(category)}
            />
          </Flex>

          {filteredFoodItems.some((item) => item.category === category.id) ? (
            <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={4}>
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
            <Text textAlign="center" color="gray.500">
              No hay elementos en esta categoría.
            </Text>
          )}
        </Box>
      ))}

      {/* Botón para añadir un nuevo elemento */}
      <Box
        bg="white"
        boxShadow="md"
        borderRadius="lg"
        p={4}
        textAlign="center"
        maxW="200px"
        mx="auto"
        cursor="pointer"
        onClick={() => setIsItemModalOpen(true)}
        _hover={{ transform: "scale(1.05)" }}
        mt={8}
      >
        <Text fontSize="2xl">+</Text>
        <Text fontSize="lg">Añadir Elemento</Text>
      </Box>

      {/* Modales */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        initialData={selectedCategory}
        selectedRestaurant={restaurantDetails}
        onCategoryCreated={fetchAllCategories}
      />
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
