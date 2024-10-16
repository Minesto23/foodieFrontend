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
import toast from "react-hot-toast"; // Import toast for notifications

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
    image: null, // Now storing the file instead of URL
    category: "",
  });

  // Pre-fill the form if editing an existing item
  useEffect(() => {
    if (initialData) {
      setFoodItem({
        ...initialData,
        image: null, // Reset file input when editing
      });
    } else {
      // Reset form when switching to add mode
      resetForm();
    }
  }, [initialData]);

  // Reset form fields
  const resetForm = () => {
    setFoodItem({
      name: "",
      description: "",
      price: "",
      image: null,
      category: "",
    });
  };

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
      image: e.target.files[0], // Store the selected file
    }));
  };

  // Handle form submission (create or update)
  const handleSubmit = async () => {
    try {
      const foodItemPayload = {
        ...foodItem,
      };

      // if (initialData) {
      //   // If editing, call updateMenuItem
      //   await updateMenuItem(initialData.id, foodItemPayload);
      //   toast.success("Item updated successfully!"); // Success notification
      // } else {
      //   // If creating, call createMenuItem
      //   await createMenuItem(foodItemPayload);
      //   toast.success("Item added successfully!"); // Success notification
      // }

      onSubmit(foodItemPayload); // Notify parent of the submission
      resetForm(); // Clear the form after submission
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error submitting item form:", error);
      toast.error("Error saving item. Please try again."); // Error notification
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
              maxLength={100} // Limiting the input to 100 characters
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={foodItem.description}
              onChange={handleChange}
              placeholder="Description"
              maxLength={100} // Limiting the input to 100 characters
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
              name="image"
              type="file"
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
