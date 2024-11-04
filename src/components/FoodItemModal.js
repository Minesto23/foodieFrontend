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
import toast from "react-hot-toast";

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
    image: null,
    category: "",
  });

  const resetForm = () => {
    setFoodItem({
      name: "",
      description: "",
      price: "",
      image: null,
      category: "",
    });
  };

  useEffect(() => {
    if (initialData) {
      setFoodItem({
        ...initialData,
        image: null,
      });
    } else {
      resetForm();
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFoodItem((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    try {
      const foodItemPayload = {
        ...foodItem,
      };

      // Uncomment these lines to enable API integration
      // if (initialData) {
      //   await updateMenuItem(initialData.id, foodItemPayload);
      //   toast.success("Item updated successfully!");
      // } else {
      //   await createMenuItem(foodItemPayload);
      //   toast.success("Item added successfully!");
      // }

      onSubmit(foodItemPayload);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting item form:", error);
      toast.error("Error saving item. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      if (onDelete && initialData) {
        await deleteMenuItem(initialData.id);
        onDelete(initialData.id);
        onClose();
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "xs", md: "md", lg: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={{ base: "md", md: "lg" }}>
          {initialData ? "Edit Food Item" : "Add New Food Item"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Item Name</FormLabel>
            <Input
              name="name"
              value={foodItem.name}
              onChange={handleChange}
              placeholder="Item Name"
              maxLength={100}
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Description</FormLabel>
            <Input
              name="description"
              value={foodItem.description}
              onChange={handleChange}
              placeholder="Description"
              maxLength={100}
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Price</FormLabel>
            <Input
              name="price"
              value={foodItem.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              step="0.01"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Image File</FormLabel>
            <Input
              name="image"
              type="file"
              onChange={handleFileChange}
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Category</FormLabel>
            <Select
              placeholder="Select Category"
              name="category"
              value={foodItem.category}
              onChange={handleChange}
              fontSize={{ base: "sm", md: "md" }}
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
            <Button colorScheme="red" mr={3} onClick={handleDelete} fontSize={{ base: "sm", md: "md" }}>
              Delete
            </Button>
          )}
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} fontSize={{ base: "sm", md: "md" }}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose} fontSize={{ base: "sm", md: "md" }}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FoodItemModal;
