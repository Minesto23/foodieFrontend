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

const MenuBar = ({
  selectedCategoryId,
  onCategorySelect,
  selectedRestaurant,
  client,
}) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories, isCategoryModalOpen]); // Fetch categories whenever modal state changes

  const handleCategorySubmit = () => {
    fetchAllCategories(); // Refresh categories after creating/editing a category
    setIsCategoryModalOpen(false); // Close the modal
  };

  let addCategoryButton = null;
  if (selectedRestaurant?.name !== "Select a restaurant" && !client) {
    addCategoryButton = (
      <CategoryButton
        icon={FaPlus}
        label="More"
        onClick={() => setIsCategoryModalOpen(true)}
      />
    );
  }

  return (
    <Box>
      <Flex
        justifyContent="center"
        mt={{ base: 4, md: 8 }}
        gap={{ base: 4, md: 6 }}
        wrap="wrap"
        px={{ base: 4, md: 10, lg: 20 }}
      >
        <CategoryButton
          icon={FaUtensils}
          label="All"
          onClick={() => onCategorySelect(null)}
          isActive={!selectedCategoryId}
        />
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            icon={iconMapping[category.icon_name]}
            label={category.name}
            onClick={() => onCategorySelect(category.id)}
            isActive={selectedCategoryId === category.id}
          />
        ))}
        {addCategoryButton}
      </Flex>

      {/* Category Modal */}
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
