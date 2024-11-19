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
  Text,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import {
  updateRestaurant,
  deleteRestaurant,
} from "../api/controllers/Restaurants";

/**
 * Componente `UpdateDeleteRestaurantModal`
 *
 * Permite a los usuarios editar o eliminar un restaurante.
 *
 * @param {boolean} isOpen - Controla la visibilidad del modal.
 * @param {function} onClose - Función para cerrar el modal.
 * @param {object} initialData - Datos iniciales del restaurante para editar.
 * @param {function} onDeleteSuccess - Callback que se ejecuta tras eliminar con éxito.
 * @param {function} onUpdateSuccess - Callback que se ejecuta tras actualizar con éxito.
 */
const UpdateDeleteRestaurantModal = ({
  isOpen,
  onClose,
  initialData,
  onDeleteSuccess,
  onUpdateSuccess,
}) => {
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    location: "",
    opening_hours: "",
    contact_email: "",
    contact_phone: "",
    logo: null, // Archivo del logo
  });

  // Rellenar el formulario con los datos iniciales
  useEffect(() => {
    if (initialData) {
      setRestaurantDetails({
        ...initialData,
        logo: null, // Evitar pasar datos antiguos del logo
      });
    }
  }, [initialData]);

  /**
   * Maneja los cambios en los campos del formulario.
   *
   * @param {object} e - Evento del cambio en el input.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Maneja el cambio en el campo de carga de archivos.
   *
   * @param {object} e - Evento del cambio en el campo de archivo.
   */
  const handleFileChange = (e) => {
    setRestaurantDetails((prevState) => ({
      ...prevState,
      logo: e.target.files[0],
    }));
  };

  /**
   * Envía el formulario para actualizar los datos del restaurante.
   */
  const handleSubmit = async () => {
    try {
      const updatedRestaurant = await updateRestaurant(
        initialData.id,
        restaurantDetails
      );
      toast.success("¡Restaurante actualizado con éxito!");
      onUpdateSuccess(updatedRestaurant); // Actualizar la interfaz tras el éxito
      onClose();
    } catch (error) {
      console.error("Error al actualizar el restaurante:", error);
      toast.error("Error al actualizar el restaurante.");
    }
  };

  /**
   * Maneja la eliminación del restaurante.
   */
  const handleDelete = async () => {
    try {
      await deleteRestaurant(initialData.id);
      toast.success("¡Restaurante eliminado con éxito!");
      onDeleteSuccess(initialData.id); // Actualizar la interfaz tras la eliminación
      onClose();
    } catch (error) {
      console.error("Error al eliminar el restaurante:", error);
      toast.error("Error al eliminar el restaurante.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar o Eliminar Restaurante</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Nombre del Restaurante */}
          <FormControl mb={4}>
            <FormLabel>Nombre</FormLabel>
            <Input
              name="name"
              value={restaurantDetails.name}
              onChange={handleChange}
              placeholder="Nombre del Restaurante"
            />
          </FormControl>

          {/* Ubicación */}
          <FormControl mb={4}>
            <FormLabel>Ubicación</FormLabel>
            <Input
              name="location"
              value={restaurantDetails.location}
              onChange={handleChange}
              placeholder="123 Calle Principal"
            />
          </FormControl>

          {/* Horario de Apertura */}
          <FormControl mb={4}>
            <FormLabel>Horario de Apertura</FormLabel>
            <Input
              name="opening_hours"
              value={restaurantDetails.opening_hours}
              onChange={handleChange}
              placeholder="9AM - 9PM"
            />
          </FormControl>

          {/* Email de Contacto */}
          <FormControl mb={4}>
            <FormLabel>Email de Contacto</FormLabel>
            <Input
              name="contact_email"
              type="email"
              value={restaurantDetails.contact_email}
              onChange={handleChange}
              placeholder="contacto@restaurante.com"
            />
          </FormControl>

          {/* Teléfono de Contacto */}
          <FormControl mb={4}>
            <FormLabel>Teléfono de Contacto</FormLabel>
            <Input
              name="contact_phone"
              value={restaurantDetails.contact_phone}
              onChange={handleChange}
              placeholder="123-456-7890"
            />
          </FormControl>

          {/* Carga de Logo */}
          <FormControl mb={4}>
            <FormLabel>Logo</FormLabel>
            <Input type="file" name="logo" onChange={handleFileChange} />
          </FormControl>

          {/* Nota sobre la eliminación */}
          <Text color="red.500" mt={4}>
            Nota: Eliminar este restaurante eliminará todos los datos asociados.
          </Text>
        </ModalBody>

        <ModalFooter>
          {/* Botón de Eliminar */}
          <Button colorScheme="red" mr={3} onClick={handleDelete}>
            Eliminar
          </Button>

          {/* Botón de Guardar Cambios */}
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Guardar Cambios
          </Button>

          {/* Botón de Cancelar */}
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateDeleteRestaurantModal;
