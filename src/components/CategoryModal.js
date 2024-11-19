import React, { useState, useEffect, useCallback } from "react";
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

  // Memoizamos la función para evitar recrearla en cada renderizado
  const resetForm = useCallback(() => {
    setCategory({
      name: "",
      description: "",
      icon_name: "",
      restaurant: selectedRestaurant?.id || null,
    });
  }, [selectedRestaurant]);

  useEffect(() => {
    if (initialData) {
      setCategory({ ...initialData, restaurant: selectedRestaurant?.id });
    } else {
      resetForm();
    }
  }, [initialData, selectedRestaurant, resetForm]);

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
    toast({ title: "Procesando...", status: "info", duration: 1000 });
    try {
      const categoryPayload = {
        ...category,
        restaurant: selectedRestaurant?.id,
      };

      if (initialData) {
        await updateCategory(initialData.id, categoryPayload);
        toast({ title: "Categoría actualizada con éxito.", status: "success" });
      } else {
        await createCategory(categoryPayload);
        toast({ title: "Categoría creada con éxito.", status: "success" });
      }

      if (onCategoryCreated) onCategoryCreated();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al enviar la categoría:", error);
      toast({
        title: "Error al enviar la categoría.",
        description: error.message || "Por favor, inténtalo de nuevo.",
        status: "error",
      });
    }
  };

  const handleDelete = async () => {
    if (initialData) {
      toast({ title: "Eliminando...", status: "info", duration: 1000 });
      try {
        await deleteCategory(initialData.id);
        toast({ title: "Categoría eliminada con éxito.", status: "success" });
        onDelete(initialData.id);
        onClose();
      } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        toast({
          title: "Error al eliminar la categoría.",
          description: error.message || "Por favor, inténtalo de nuevo.",
          status: "error",
        });
      }
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
          {initialData ? "Editar Categoría" : "Nueva Categoría"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Nombre de la Categoría</FormLabel>
            <Input
              name="name"
              value={category.name}
              onChange={handleChange}
              placeholder="Nombre de la Categoría"
              maxLength={100}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              name="description"
              value={category.description}
              onChange={handleChange}
              placeholder="Descripción"
              maxLength={100}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Selecciona un Ícono</FormLabel>
            <Grid
              templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }}
              gap={4}
            >
              {iconList.map((icon) => (
                <Box
                  key={icon.name}
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
                >
                  <Icon as={icon.component} w={6} h={6} />
                </Box>
              ))}
            </Grid>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {initialData && (
            <Button colorScheme="red" mr="auto" onClick={handleDelete}>
              Eliminar
            </Button>
          )}
          <Button colorScheme="blue" onClick={handleSubmit}>
            {initialData ? "Actualizar" : "Guardar"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CategoryModal;
