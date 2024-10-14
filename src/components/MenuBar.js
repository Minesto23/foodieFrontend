import React, { useState } from "react";
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

const MenuBar = ({
  categories,
  selectedCategoryId,
  onCategorySelect,
  selectedRestaurant,
  client,
}) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // Controlar el estado del modal

  // Mapeo de íconos
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

  // Botón para agregar categoría
  let addCategoryButton = null;
  if (selectedRestaurant?.name !== "Select a restaurant" && !client) {
    addCategoryButton = (
      <CategoryButton
        icon={FaPlus}
        label="More"
        onClick={() => setIsCategoryModalOpen(true)} // Abrir el modal
      />
    );
  }

  return (
    <Box>
      <Flex
        justifyContent="center"
        mt={8}
        gap={6}
        wrap="wrap"
        style={{ margin: "40px 200px " }}
      >
        <CategoryButton
          icon={FaUtensils}
          label="All"
          onClick={() => onCategorySelect(null)}
          isActive={!selectedCategoryId} // Activo si no hay ninguna categoría seleccionada
        />
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            icon={iconMapping[category.icon_name]}
            label={category.name}
            onClick={() => onCategorySelect(category.id)}
            isActive={selectedCategoryId === category.id} // Activo si la categoría está seleccionada
          />
        ))}
        {addCategoryButton}
      </Flex>

      {/* Modal de categoría */}
      <CategoryModal
        isOpen={isCategoryModalOpen} // Controlar si el modal está abierto
        onClose={() => setIsCategoryModalOpen(false)} // Cerrar el modal
        onSubmit={(newCategory) => console.log(newCategory)} // Manejar la nueva categoría
        selectedRestaurant={selectedRestaurant} // Pasar el restaurante seleccionado
      />
    </Box>
  );
};

export default MenuBar;
