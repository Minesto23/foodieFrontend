import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import CategoryButton from "./CategoryButton";
import { FaUtensils, FaPlus } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
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
// import { RiDrinks2Fill } from "react-icons/ri";

const MenuBar = ({
  categories,
  selectedCategoryId,
  onCategorySelect,
  selectedRestaurant,
  Open,
  openCategoryModal,
}) => {
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
  let addCategoryButton = null;
  console.log(openCategoryModal, "estado");

  if (selectedRestaurant?.name !== "Select a restaurant") {
    addCategoryButton = <CategoryButton icon={FaPlus} label="More" onClick={openCategoryModal} />;
  }

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
            icon={iconMapping[category.icon_name]}
            label={category.name}
            onClick={() => onCategorySelect(category.id)}
            isActive={selectedCategoryId === category.id} // Active if category is selected
          />
        ))}
        {addCategoryButton}
      </Flex>

      <CategoryModal
        isOpen={Open}
        onClose={openCategoryModal}
        onSubmit={(newCategory) => console.log(newCategory)}
        selectedRestaurant={selectedRestaurant} // Pass the selectedRestaurant here
      />
    </Box>
  );
};

export default MenuBar;
