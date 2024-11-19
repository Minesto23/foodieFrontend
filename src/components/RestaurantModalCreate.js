import React, { useState } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  Switch,
  Text,
  Box,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";
import { createRestaurant } from "../api/controllers/Restaurants";

/**
 * Componente CreateRestaurantModal
 *
 * Permite agregar un nuevo restaurante con detalles básicos, tipos y servicios.
 *
 * @param {boolean} isOpen - Indica si el modal está abierto.
 * @param {function} onClose - Función para cerrar el modal.
 */
const CreateRestaurantModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    location: "",
    opening_hours: "",
    contact_email: "",
    contact_phone: "",
    logo: null,
    restaurant_type: [],
    services: [],
  });

  const categories = [
    { value: "panaderia", label: "Panadería" },
    { value: "carne_pescado", label: "Carne y Pescado" },
    { value: "cafeteria", label: "Cafetería" },
    { value: "bar", label: "Bar" },
    { value: "americana", label: "Americana" },
    // Más categorías aquí...
  ];

  const services = [
    { value: "order_online", label: "Ordenar Online" },
    { value: "delivery", label: "Entrega a Domicilio" },
    { value: "pick_up", label: "Recoger en Tienda" },
    { value: "acepta_tarjeta", label: "Acepta Tarjeta" },
    { value: "wifi", label: "WIFI" },
    // Más servicios aquí...
  ];

  /**
   * Maneja los cambios en los campos del formulario.
   *
   * @param {object} e - Evento de cambio.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Maneja el cambio en el campo de carga de archivo.
   *
   * @param {object} e - Evento del campo de archivo.
   */
  const handleFileChange = (e) => {
    setRestaurantDetails((prevState) => ({
      ...prevState,
      logo: e.target.files[0],
    }));
  };

  /**
   * Alterna las opciones seleccionadas para un campo (tipos o servicios).
   *
   * @param {string} value - Valor de la opción.
   * @param {string} key - Clave del estado a actualizar.
   */
  const handleToggle = (value, key) => {
    setRestaurantDetails((prevState) => {
      const currentValues = prevState[key];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prevState, [key]: updatedValues };
    });
  };

  /**
   * Maneja la acción de enviar el formulario para crear un restaurante.
   */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createRestaurant(restaurantDetails);
      toast.success("¡Restaurante agregado exitosamente!");
      onClose();
    } catch (error) {
      console.error("Error al crear el restaurante:", error);
      toast.error("Error al agregar el restaurante.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Nuevo Restaurante</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Nombre</FormLabel>
            <Input
              name="name"
              value={restaurantDetails.name}
              onChange={handleChange}
              placeholder="Nombre del Restaurante"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Ubicación</FormLabel>
            <Input
              name="location"
              value={restaurantDetails.location}
              onChange={handleChange}
              placeholder="123 Calle Principal"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Horario de Apertura</FormLabel>
            <Input
              name="opening_hours"
              value={restaurantDetails.opening_hours}
              onChange={handleChange}
              placeholder="9AM - 9PM"
            />
          </FormControl>
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
          <FormControl mb={4}>
            <FormLabel>Teléfono de Contacto</FormLabel>
            <Input
              name="contact_phone"
              value={restaurantDetails.contact_phone}
              onChange={handleChange}
              placeholder="123-456-7890"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Logo</FormLabel>
            <Input type="file" name="logo" onChange={handleFileChange} />
          </FormControl>

          {/* Selección de Tipos de Restaurante */}
          <FormControl mb={4}>
            <FormLabel>Tipo de Restaurante</FormLabel>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                width="100%"
              >
                Seleccionar Tipos
              </MenuButton>
              <MenuList>
                <SimpleGrid columns={3} spacing={2} p={2}>
                  {categories.map(({ value, label }) => (
                    <Flex key={value} alignItems="center">
                      <Switch
                        isChecked={restaurantDetails.restaurant_type.includes(
                          value
                        )}
                        onChange={() => handleToggle(value, "restaurant_type")}
                      />
                      <Text ml={2}>{label}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </MenuList>
            </Menu>
          </FormControl>

          {/* Selección de Servicios */}
          <FormControl mb={4}>
            <FormLabel>Servicios</FormLabel>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                width="100%"
              >
                Seleccionar Servicios
              </MenuButton>
              <MenuList>
                <SimpleGrid columns={3} spacing={2} p={2}>
                  {services.map(({ value, label }) => (
                    <Flex key={value} alignItems="center">
                      <Switch
                        isChecked={restaurantDetails.services.includes(value)}
                        onChange={() => handleToggle(value, "services")}
                      />
                      <Text ml={2}>{label}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </MenuList>
            </Menu>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={loading}
          >
            Agregar Restaurante
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateRestaurantModal;
