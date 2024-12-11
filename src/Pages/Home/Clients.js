import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Flex, useColorMode, Text } from "@chakra-ui/react";
import MenuBar from "../../components/MenuBar";
import FoodCard from "../../components/FoodCard";
import EmptyFood from "../../components/EmptyFood";
import RestaurantHeader from "../../components/HeaderClient";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

// Hooks personalizados
import { UseCategories } from "../../hooks/UseMenuCategories";
import UseMenuItems from "../../hooks/UseMenuItems";

// Controladores
import { getRestaurantById } from "../../api/controllers/Restaurants";

/**
 * Componente principal que gestiona la visualización del restaurante y su menú.
 *
 * @returns {JSX.Element} Página principal de visualización del restaurante.
 */
const MainPage = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { id } = useParams(); // Obtener el ID del restaurante desde la URL
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hooks para gestionar las categorías y los elementos del menú
  const { menuCategories: categories, fetchAllCategories } =
    UseCategories(restaurantDetails);
  const { menuItems, fetchAllMenuItems } = UseMenuItems();

  // Estados locales
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Fetch inicial para obtener los detalles del restaurante
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await getRestaurantById(id);
          setRestaurantDetails(data);
        } catch (error) {
          console.error("Error fetching restaurant details:", error);
          toast.error("No se pudieron cargar los detalles del restaurante.");
        } finally {
          setLoading(false);
        }
      } else {
        setRestaurantDetails({ name: "Seleccione un restaurante" });
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  // Fetch de categorías y elementos del menú cuando el restaurante cambia
  useEffect(() => {
    if (restaurantDetails) {
      fetchAllCategories();
      fetchAllMenuItems();
    }
  }, [restaurantDetails, fetchAllCategories, fetchAllMenuItems]);

  /**
   * Filtra los elementos del menú según la categoría seleccionada.
   */
  const filteredFoodItems = selectedCategoryId
    ? menuItems.filter((item) => item.category === selectedCategoryId)
    : menuItems;

  /**
   * Maneja la selección de categorías.
   * @param {number|null} categoryId - ID de la categoría seleccionada.
   */
  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
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
      {/* Encabezado del restaurante */}
      <RestaurantHeader
        name={restaurantDetails?.name || "Nombre no disponible"}
        logo={restaurantDetails?.logo_url || ""}
        opening_hour={
          restaurantDetails?.opening_hours || "Horario no disponible"
        }
        location={restaurantDetails?.location || "Ubicación no disponible"}
      />

      {/* Barra de menú para categorías */}
      <MenuBar
        categories={categories || []}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleCategorySelect}
        selectedRestaurant={restaurantDetails}
        client={true} // Visualización de cliente, sin opciones de edición
      />

      {/* Renderizado condicional de los elementos del menú */}
      {filteredFoodItems?.length > 0 ? (
        categories?.map((category) => (
          <Box key={category.id} mt={8}>
            {filteredFoodItems.some(
              (item) => item.category === category.id
            ) && (
              <>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  {/* Category Name */}
                  <Text
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="bold"
                    mb={2} // Adjust spacing
                  >
                    {category.name}
                  </Text>

                  {/* Category Description */}
                  {category.description && (
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      fontWeight="medium"
                      color="gray.500"
                      textAlign="center" // Centers the description text
                      px={4} // Adds horizontal padding for better readability
                    >
                      {category.description}
                    </Text>
                  )}
                </Flex>

                {/* Grid responsivo de elementos del menú */}
                <Flex justifyContent="center">
                  <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                    spacing={4}
                  >
                    {filteredFoodItems
                      ?.filter((item) => item.category === category.id)
                      .map((item) => (
                        <FoodCard
                          key={item.id}
                          imageUrl={
                            item.image_url || "https://i.imgur.com/j5YpWgZ.png"
                          }
                          category={item.name}
                          description={item.description}
                          price={item.price}
                        />
                      ))}
                  </SimpleGrid>
                </Flex>
              </>
            )}
          </Box>
        ))
      ) : (
        <EmptyFood /> // Renderizar componente vacío si no hay elementos
      )}
    </Box>
  );
};

export default MainPage;
