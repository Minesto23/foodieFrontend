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
import { deleteMenuItem } from "../api/controllers/MenuItems";
import toast from "react-hot-toast";

/**
 * Modal para gestionar elementos del menú (crear, editar, eliminar).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto.
 * @param {function} props.onClose - Función para cerrar el modal.
 * @param {function} props.onSubmit - Función a ejecutar al enviar el formulario.
 * @param {Object} [props.initialData=null] - Datos iniciales del elemento (para edición).
 * @param {function} props.onDelete - Función para eliminar el elemento.
 * @param {Array} props.categories - Lista de categorías disponibles.
 * @returns {React.Component} Componente FoodItemModal.
 */
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

  /**
   * Restablece el formulario a su estado inicial.
   */
  const resetForm = () => {
    setFoodItem({
      name: "",
      description: "",
      price: "",
      image: null,
      category: "",
    });
  };

  // Configurar datos iniciales si existen
  useEffect(() => {
    if (initialData) {
      setFoodItem({
        ...initialData,
        image: null, // La imagen no se pasa en la edición
      });
    } else {
      resetForm();
    }
  }, [initialData]);

  // Restablecer el formulario cuando el modal se cierra
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  /**
   * Maneja los cambios en los campos del formulario.
   *
   * @param {Object} e - Evento de cambio.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Maneja el cambio en el campo de archivo (imagen).
   *
   * @param {Object} e - Evento de cambio.
   */
  const handleFileChange = (e) => {
    setFoodItem((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  /**
   * Envía los datos del formulario para crear o actualizar el elemento del menú.
   */
  const handleSubmit = async () => {
    try {
      const foodItemPayload = { ...foodItem };

      // Descomenta las líneas para habilitar integración con la API
      // if (initialData) {
      //   await updateMenuItem(initialData.id, foodItemPayload);
      //   toast.success("Elemento actualizado con éxito.");
      // } else {
      //   await createMenuItem(foodItemPayload);
      //   toast.success("Elemento creado con éxito.");
      // }

      onSubmit(foodItemPayload);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error(
        "Error al guardar el elemento. Por favor, inténtalo de nuevo."
      );
    }
  };

  /**
   * Elimina el elemento actual.
   */
  const handleDelete = async () => {
    try {
      if (onDelete && initialData) {
        await deleteMenuItem(initialData.id);
        onDelete(initialData.id);
        onClose();
      }
    } catch (error) {
      console.error("Error al eliminar el elemento:", error);
      toast.error(
        "Error al eliminar el elemento. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", md: "md", lg: "lg" }} // Tamaño adaptativo del modal
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={{ base: "md", md: "lg" }}>
          {initialData ? "Editar Elemento" : "Nuevo Elemento"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Nombre del elemento */}
          <FormControl mb={4}>
            <FormLabel>Nombre del Elemento</FormLabel>
            <Input
              name="name"
              value={foodItem.name}
              onChange={handleChange}
              placeholder="Nombre del Elemento"
              maxLength={100}
            />
          </FormControl>

          {/* Descripción */}
          <FormControl mb={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              name="description"
              value={foodItem.description}
              onChange={handleChange}
              placeholder="Descripción"
              maxLength={100}
            />
          </FormControl>

          {/* Precio */}
          <FormControl mb={4}>
            <FormLabel>Precio</FormLabel>
            <Input
              name="price"
              value={foodItem.price}
              onChange={handleChange}
              placeholder="Precio"
              type="number"
              step="0.01"
            />
          </FormControl>

          {/* Imagen */}
          <FormControl mb={4}>
            <FormLabel>Imagen</FormLabel>
            <Input name="image" type="file" onChange={handleFileChange} />
          </FormControl>

          {/* Categoría */}
          <FormControl mb={4}>
            <FormLabel>Categoría</FormLabel>
            <Select
              placeholder="Seleccionar Categoría"
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
              Eliminar
            </Button>
          )}
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Guardar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FoodItemModal;
