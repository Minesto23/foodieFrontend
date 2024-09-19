import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
  Icon,
  Box,
} from "@chakra-ui/react";
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
// Import the necessary controllers
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/controllers/Categories";

// Icon list for category selection
const iconList = [
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
];

const CategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  onDelete,
  selectedRestaurant,
}) => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    icon: null, // Icon state
    restaurant: selectedRestaurant?.id || null, // Assign the restaurant ID
  });

  // Pre-fill modal for editing
  useEffect(() => {
    if (initialData) {
      setCategory({ ...initialData, restaurant: selectedRestaurant?.id }); // Add restaurant ID to the category
    } else {
      setCategory({
        name: "",
        description: "",
        icon: null,
        restaurant: selectedRestaurant?.id,
      }); // Reset for new category
    }
  }, [initialData, selectedRestaurant]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle icon selection
  const handleIconSelect = (selectedIcon) => {
    setCategory((prevState) => ({
      ...prevState,
      icon: selectedIcon,
    }));
  };

  // Handle form submission (create or update category)
  const handleSubmit = async () => {
    try {
      if (initialData) {
        // Update category if initialData exists
        await updateCategory(initialData.id, category);
      } else {
        // Create new category
        await createCategory(category);
      }
      onSubmit(category); // Call parent submit handler to update the UI
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    if (onDelete && initialData) {
      try {
        await deleteCategory(initialData.id); // Call delete controller
        onDelete(initialData.id); // Call parent delete handler to update the UI
        onClose(); // Close modal after deletion
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData ? "Edit Category" : "Add New Category"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Category Name Input */}
          <FormControl mb={4}>
            <FormLabel>Category Name</FormLabel>
            <Input
              name="name"
              value={category.name}
              onChange={handleChange}
              placeholder="Category Name"
            />
          </FormControl>

          {/* Description Input */}
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={category.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </FormControl>

          {/* Icon Selection */}
          <FormControl mb={4}>
            <FormLabel>Select Icon</FormLabel>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              {iconList.map((IconComponent, index) => (
                <Box
                  key={index}
                  p={2}
                  border="1px solid"
                  borderColor={
                    category.icon === IconComponent ? "blue.400" : "gray.200"
                  }
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleIconSelect(IconComponent)}
                >
                  <Icon as={IconComponent} w={6} h={6} />
                </Box>
              ))}
            </Grid>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {/* Delete Button (only show if editing) */}
          {initialData && (
            <Button colorScheme="red" mr="auto" onClick={handleDelete}>
              Delete
            </Button>
          )}
          {/* Save or Update Button */}
          <Button colorScheme="blue" onClick={handleSubmit}>
            {initialData ? "Update" : "Save"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CategoryModal;
