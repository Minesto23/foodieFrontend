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
  useToast,
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
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/controllers/Categories";

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
  onCategoryCreated,
}) => {
  const toast = useToast();
  const [category, setCategory] = useState({
    name: "",
    description: "",
    icon_name: "",
    restaurant: selectedRestaurant?.id || null,
  });

  const resetForm = () => {
    setCategory({
      name: "",
      description: "",
      icon_name: "",
      restaurant: selectedRestaurant?.id,
    });
  };

  useEffect(() => {
    if (initialData) {
      setCategory({ ...initialData, restaurant: selectedRestaurant?.id });
    } else {
      resetForm();
    }
  }, [initialData, selectedRestaurant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleIconSelect = (selectedIconName) => {
    setCategory((prevState) => ({
      ...prevState,
      icon_name: selectedIconName,
    }));
  };

  const handleSubmit = async () => {
    toast({ title: "Processing...", status: "info", duration: 1000 });
    try {
      const categoryPayload = {
        ...category,
        restaurant: selectedRestaurant?.id,
      };

      if (initialData) {
        await updateCategory(initialData.id, categoryPayload);
        toast({ title: "Category updated successfully.", status: "success" });
        onCategoryCreated();
      } else {
        await createCategory(categoryPayload);
        toast({ title: "Category created successfully.", status: "success" });
        if (onCategoryCreated) {
          onCategoryCreated();
        }
      }

      // onSubmit(categoryPayload);
      onCategoryCreated();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting category:", error);
      toast({
        title: "Error submitting category.",
        description: error.message || "Please try again.",
        status: "error",
      });
    }
  };

  const handleDelete = async () => {
    console.log(initialData);
    if (initialData) {
      toast({ title: "Deleting...", status: "info", duration: 1000 });
      try {
        console.log(`Attempting to delete category with ID: ${initialData.id}`);
        await deleteCategory(initialData.id);
        toast({ title: "Category deleted successfully.", status: "success" });
        onDelete(initialData.id); // Update parent component
        onClose();
      } catch (error) {
        console.error("Error deleting category:", error);
        toast({
          title: "Error deleting category.",
          description: error.message || "Please try again.",
          status: "error",
        });
      }
    } else {
      console.warn(
        "Delete operation failed: initialData or onDelete is missing."
      );
      toast({
        title: "No category to delete.",
        status: "warning",
        duration: 2000,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", md: "md", lg: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={{ base: "lg", md: "xl" }}>
          {initialData ? "Edit Category" : "Add New Category"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Category Name
            </FormLabel>
            <Input
              name="name"
              value={category.name}
              onChange={handleChange}
              placeholder="Category Name"
              maxLength={100}
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Description
            </FormLabel>
            <Input
              name="description"
              value={category.description}
              onChange={handleChange}
              placeholder="Description"
              maxLength={100}
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Select Icon
            </FormLabel>
            <Grid
              templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }}
              gap={4}
            >
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
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  h={{ base: 10, md: 12 }}
                  w={{ base: 10, md: 12 }}
                >
                  <Icon
                    as={icon.component}
                    w={{ base: 5, md: 6 }}
                    h={{ base: 5, md: 6 }}
                  />
                </Box>
              ))}
            </Grid>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {initialData && (
            <Button
              colorScheme="red"
              mr="auto"
              onClick={handleDelete}
              fontSize={{ base: "sm", md: "md" }}
            >
              Delete
            </Button>
          )}
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            fontSize={{ base: "sm", md: "md" }}
          >
            {initialData ? "Update" : "Save"}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            fontSize={{ base: "sm", md: "md" }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CategoryModal;
