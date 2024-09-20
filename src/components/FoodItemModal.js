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
  Select,
} from "@chakra-ui/react";
import {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../api/controllers/MenuItems";

const FoodItemModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  onDelete,
  categories = [],
}) => {
  const [foodItem, setFoodItem] = useState({
    name: "",
    description: "",
    price: "",
    imageFile: null, // Now storing the file instead of URL
    category: "",
  });

  // Pre-fill the form if editing an existing item
  useEffect(() => {
    if (initialData) {
      setFoodItem({
        ...initialData,
        imageFile: null, // Reset file input when editing
      });
    } else {
      // Reset form when switching to add mode
      setFoodItem({
        name: "",
        description: "",
        price: "",
        imageFile: null,
        category: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFoodItem((prevState) => ({
      ...prevState,
      imageFile: e.target.files[0], // Store the selected file
    }));
  };

  // Handle form submission (create or update)
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", foodItem.name);
    formData.append("description", foodItem.description);
    formData.append("price", foodItem.price);
    formData.append("category", foodItem.category);

    if (foodItem.imageFile) {
      formData.append("image", foodItem.imageFile); // Append image file if it exists
    }

    try {
      let response;
      if (initialData) {
        // Update existing item
        response = await updateMenuItem(initialData.id, formData);
      } else {
        // Create new item
        response = await createMenuItem(formData);
      }

      if (response.image_url) {
        formData.append("image_url", response.image_url); // Store the image URL after uploading
      }

      onSubmit(response); // Pass the response (with the image_url) to the parent component
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Error saving menu item:", error);
    }
  };

  // Handle deletion of the food item
  const handleDelete = async () => {
    try {
      if (onDelete && initialData) {
        await deleteMenuItem(initialData.id); // Delete item from backend
        onDelete(initialData.id); // Pass the deleted item's ID to the parent component
        onClose(); // Close modal after deletion
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
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
            <FormLabel>Image File</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange} // Handle file input change
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select Category"
              name="category"
              value={foodItem.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
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
