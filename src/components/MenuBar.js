import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import CategoryButton from "./CategoryButton";
import { FaUtensils, FaPlus } from "react-icons/fa"; // Example icons
import { useDisclosure } from "@chakra-ui/react";
import CategoryModal from "./CategoryModal"; // Import the modal

const MenuBar = ({ categories }) => {
  // Modal state management for category modal
  const {
    isOpen: isCategoryOpen,
    onOpen: onCategoryOpen,
    onClose: onCategoryClose,
  } = useDisclosure();

  // Function to handle category submission from the modal
  const handleAddCategory = (newCategory) => {
    console.log("New Category Submitted:", newCategory);
    // Logic to update category list can be added here
  };

  return (
    <Box>
      {/* Flex container for category buttons */}
      <Flex justifyContent="center" mt={6} gap={6} wrap="wrap">
        {/* All button (always visible) */}
        <CategoryButton icon={FaUtensils} label="All" isActive />

        {/* Dynamically render category buttons */}
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            icon={category.icon}
            label={category.label}
          />
        ))}

        {/* More button to trigger the category modal */}
        <CategoryButton icon={FaPlus} label="More" onClick={onCategoryOpen} />
      </Flex>

      {/* Category Modal for adding a new category */}
      <CategoryModal
        isOpen={isCategoryOpen} // This controls modal visibility
        onClose={onCategoryClose} // This will close the modal
        onSubmit={handleAddCategory} // Logic to handle form submission
      />
    </Box>
  );
};

export default MenuBar;
