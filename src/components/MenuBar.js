import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import CategoryButton from "./CategoryButton";
import { FaUtensils, FaPlus } from "react-icons/fa";
import CategoryModal from "./CategoryModal";
import {
  FaDrumstickBite,
  FaAppleAlt,
  FaFish,
  FaCoffee,
  FaPizzaSlice,
  FaIceCream,
  FaCarrot,
  FaCheese,
  FaHamburger,
  FaBreadSlice,
  FaCookie,
  FaLeaf,
  FaPepperHot,
  FaWineBottle,
  FaBeer,
} from "react-icons/fa";
import { UseCategories } from "../hooks/UseMenuCategories";

/**
 * Componente MenuBar
 *
 * Muestra una barra de categorías para un menú, permitiendo seleccionar y gestionar las categorías.
 *
 * @param {string|null} selectedCategoryId - ID de la categoría seleccionada.
 * @param {Function} onCategorySelect - Callback que se ejecuta al seleccionar una categoría.
 * @param {Object} selectedRestaurant - Datos del restaurante seleccionado.
 * @param {boolean} client - Indica si el modo actual es para clientes (sin permisos de edición).
 *
 * @returns {React.Component} Componente de la barra de menú.
 */
const MenuBar = ({
  selectedCategoryId,
  onCategorySelect,
  selectedRestaurant,
  client,
}) => {
  // Estado para controlar la apertura del modal de categorías
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  /**
   * Mapeo de iconos según el nombre.
   */
  const iconMapping = {
    FaDrumstickBite: FaDrumstickBite,
    FaAppleAlt: FaAppleAlt,
    FaFish: FaFish,
    FaCoffee: FaCoffee,
    FaPizzaSlice: FaPizzaSlice,
    FaIceCream: FaIceCream,
    FaCarrot: FaCarrot,
    FaCheese: FaCheese,
    FaHamburger: FaHamburger,
    FaBreadSlice: FaBreadSlice,
    FaCookie: FaCookie,
    FaLeaf: FaLeaf,
    FaPepperHot: FaPepperHot,
    FaWineBottle: FaWineBottle,
    FaBeer: FaBeer,
  };

  const { menuCategories: categories, fetchAllCategories } =
    UseCategories(selectedRestaurant);

  // Actualiza las categorías al montar o cambiar el estado del modal
  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories, isCategoryModalOpen]);

  /**
   * Maneja el evento de envío en el modal de categorías.
   */
  const handleCategorySubmit = () => {
    fetchAllCategories(); // Refresca las categorías
    setIsCategoryModalOpen(false); // Cierra el modal
  };

  /**
   * Botón para agregar nuevas categorías (sólo disponible si no es modo cliente).
   */
  const addCategoryButton =
    selectedRestaurant?.name !== "Select a restaurant" && !client ? (
      <CategoryButton
        icon={FaPlus}
        label="Más"
        onClick={() => setIsCategoryModalOpen(true)}
      />
    ) : null;

  return (
    <Box>
      {/* Barra de botones de categorías */}
      <Flex
        justifyContent="center"
        mt={{ base: 4, md: 8 }}
        gap={{ base: 4, md: 6 }}
        wrap="wrap"
        px={{ base: 4, md: 10, lg: 20 }}
      >
        {/* Botón para mostrar todos los ítems */}
        <CategoryButton
          icon={FaUtensils}
          label="Todos"
          onClick={() => onCategorySelect(null)}
          isActive={!selectedCategoryId}
        />

        {/* Botones dinámicos de categorías */}
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            icon={iconMapping[category.icon_name]}
            label={category.name}
            onClick={() => onCategorySelect(category.id)}
            isActive={selectedCategoryId === category.id}
          />
        ))}

        {/* Botón de agregar categoría */}
        {addCategoryButton}
      </Flex>

      {/* Modal para agregar/editar categorías */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={handleCategorySubmit}
        selectedRestaurant={selectedRestaurant}
        onDelete={fetchAllCategories}
        onCategoryCreated={fetchAllCategories}
      />
    </Box>
  );
};

export default MenuBar;
