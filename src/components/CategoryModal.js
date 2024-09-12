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
}) => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    icon: null, // Add icon to the state
  });

  // Effect to pre-fill the modal if it's in edit mode
  useEffect(() => {
    if (initialData) {
      setCategory(initialData);
    } else {
      setCategory({ name: "", description: "", icon: null }); // Reset for new category
    }
  }, [initialData]);

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

  const handleSubmit = () => {
    onSubmit(category); // Call onSubmit with the category data (update or add)
    onClose(); // Close the modal after submission
  };

  const handleDelete = () => {
    if (onDelete && initialData) {
      onDelete(initialData.id); // Pass the ID to the delete handler
      onClose(); // Close modal after delete
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
          <FormControl mb={4}>
            <FormLabel>Category Name</FormLabel>
            <Input
              name="name"
              value={category.name}
              onChange={handleChange}
              placeholder="Category Name"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={category.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </FormControl>

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
          {initialData && (
            <Button colorScheme="red" mr="auto" onClick={handleDelete}>
              Delete
            </Button>
          )}
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
