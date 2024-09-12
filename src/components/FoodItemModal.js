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
} from "@chakra-ui/react";

const FoodItemModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  onDelete,
}) => {
  const [foodItem, setFoodItem] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  // UseEffect to load the initial data into the form for editing
  useEffect(() => {
    if (initialData) {
      setFoodItem(initialData); // Pre-fill form with the selected food item for editing
    } else {
      // Reset the form when switching to add mode
      setFoodItem({ name: "", description: "", price: "", imageUrl: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(foodItem); // Call onSubmit with the updated/new food item data
    onClose(); // Close the modal
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(foodItem.id); // Call onDelete with the item ID
      onClose(); // Close the modal after deletion
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData ? "Edit Food Item" : "Add New Food Item"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Item Name</FormLabel>
            <Input
              name="name"
              value={foodItem.name}
              onChange={handleChange}
              placeholder="Item Name"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={foodItem.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              value={foodItem.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              step="0.01"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Image URL</FormLabel>
            <Input
              name="imageUrl"
              value={foodItem.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {initialData && (
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FoodItemModal;
