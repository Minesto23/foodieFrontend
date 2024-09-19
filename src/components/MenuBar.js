import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import CategoryButton from "./CategoryButton";
import { FaUtensils, FaPlus } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import CategoryModal from "./CategoryModal";
import { FaDrumstickBite, FaAppleAlt, FaFish } from "react-icons/fa";
import { RiDrinks2Fill } from "react-icons/ri";

const MenuBar = ({ categories, selectedCategoryId, onCategorySelect }) => {
  const {
    isOpen: isCategoryOpen,
    onOpen: onCategoryOpen,
    onClose: onCategoryClose,
  } = useDisclosure();

  const iconMapping = {
    FaUtensils: FaUtensils,
    FaDrumstickBite: FaDrumstickBite,
    FaAppleAlt: FaAppleAlt,
    FaFish: FaFish,
    RiDrinks2Fill: RiDrinks2Fill,
    FaPlus: FaPlus,
  };

  return (
    <Box>
      <Flex justifyContent="center" mt={6} gap={6} wrap="wrap">
        <CategoryButton
          icon={FaUtensils}
          label="All"
          onClick={() => onCategorySelect(null)}
          isActive={!selectedCategoryId} // Active if no category is selected
        />
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            icon={iconMapping[category.icon]}
            label={category.name}
            onClick={() => onCategorySelect(category.id)}
            isActive={selectedCategoryId === category.id} // Active if category is selected
          />
        ))}
        <CategoryButton icon={FaPlus} label="More" onClick={onCategoryOpen} />
      </Flex>

      <CategoryModal
        isOpen={isCategoryOpen}
        onClose={onCategoryClose}
        onSubmit={(newCategory) => console.log(newCategory)}
      />
    </Box>
  );
};

export default MenuBar;
