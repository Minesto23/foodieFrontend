import React, { useEffect, useState } from "react";
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
import { useCategoryContext } from "../context/CategoryContext";

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
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const {
    categories,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategoryContext();

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

  // Carga inicial de categorías
  useEffect(() => {
    if (selectedRestaurant?.id) {
      fetchCategories(selectedRestaurant.id);
    }
  }, [fetchCategories, selectedRestaurant]);

  /**
   * Manejar cierre del modal de categorías.
   */
  const handleModalClose = () => {
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
    fetchCategories(selectedRestaurant.id);
  };

  /**
   * Manejar el envío de categorías (nuevo o edición).
   */
  const handleCategorySubmit = async (category) => {
    if (editingCategory) {
      await editCategory(editingCategory.id, category);
    } else {
      await addCategory(category);
    }
    handleModalClose();
  };

  /**
   * Manejar eliminación de una categoría.
   */
  const handleCategoryDelete = async (categoryId) => {
    await removeCategory(categoryId);
  };

  /**
   * Filtrar categorías para mostrar solo las del restaurante seleccionado.
   */
  const filteredCategories = categories.filter(
    (category) => category.restaurant === selectedRestaurant?.id
  );

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
        {filteredCategories.map((category) => (
          <CategoryButton
            key={category.id}
            icon={iconMapping[category.icon_name]}
            label={category.name}
            onClick={() => onCategorySelect(category.id)}
            isActive={selectedCategoryId === category.id}
            onEdit={() => {
              setEditingCategory(category);
              setIsCategoryModalOpen(true);
            }}
            onDelete={() => handleCategoryDelete(category.id)}
          />
        ))}

        {/* Botón de agregar categoría */}
        {addCategoryButton}
      </Flex>

      {/* Modal para agregar/editar categorías */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={handleModalClose}
        selectedRestaurant={selectedRestaurant}
        initialData={editingCategory}
        onSubmit={handleCategorySubmit}
        onDelete={handleCategoryDelete}
      />
    </Box>
  );
};

export default MenuBar;
