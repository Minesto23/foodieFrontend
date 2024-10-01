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
  { name: "FaDrumstickBite", component: FaDrumstickBite },
  { name: "FaAppleAlt", component: FaAppleAlt },
  { name: "FaFish", component: FaFish },
  { name: "FaCoffee", component: FaCoffee },
  { name: "FaPizzaSlice", component: FaPizzaSlice },
  { name: "FaIceCream", component: FaIceCream },
  { name: "FaCarrot", component: FaCarrot },
  { name: "FaCheese", component: FaCheese },
  { name: "FaHamburger", component: FaHamburger },
  { name: "FaBreadSlice", component: FaBreadSlice },
  { name: "FaCookie", component: FaCookie },
  { name: "FaLeaf", component: FaLeaf },
  { name: "FaPepperHot", component: FaPepperHot },
  { name: "FaWineBottle", component: FaWineBottle },
  { name: "FaBeer", component: FaBeer },
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
    icon_name: "", // Save the icon's name here
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
        icon_name: "",
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
  const handleIconSelect = (selectedIconName) => {
    setCategory((prevState) => ({
      ...prevState,
      icon_name: selectedIconName, // Save icon name instead of the component
    }));
  };

  // Handle form submission (create or update category)
  const handleSubmit = async () => {
    try {
      // Ensure the restaurant ID is included in the category payload
      const categoryPayload = {
        ...category,
        restaurant: selectedRestaurant?.id, // Ensure restaurant ID is sent
      };

      console.log("Payload:", categoryPayload); // Debug the payload here
      if (initialData) {
        // Update category if initialData exists
        await updateCategory(initialData.id, categoryPayload);
      } else {
        // Create new category
        await createCategory(categoryPayload);
      }
      onSubmit(categoryPayload); // Call parent submit handler to update the UI
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
              maxLength={100} // Limiting the input to 100 characters
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
              maxLength={100} // Limiting the input to 100 characters
            />
          </FormControl>

          {/* Icon Selection */}
          <FormControl mb={4}>
            <FormLabel>Select Icon</FormLabel>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              {iconList.map((icon, index) => (
                <Box
                  key={index}
                  p={2}
                  border="1px solid"
                  borderColor={
                    category.icon_name === icon.name ? "blue.400" : "gray.200"
                  }
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleIconSelect(icon.name)}
                >
                  <Icon as={icon.component} w={6} h={6} />
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
